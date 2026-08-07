/**
 * MissionX Real-Time Multiplayer WebSockets Game Engine
 * Manages co-op team sync, live stage advancement, 3D object inspection broadcasts, and team pings.
 */

// In-memory active session rosters
const activeSessions = new Map();

const setupGameSockets = (io) => {
  io.on('connection', (socket) => {
    console.log(`[WebSocket Client Connected] Socket ID: ${socket.id}`);

    // 1. Join Multiplayer Escape Room Session
    socket.on('join_session', ({ sessionCode = 'ROOM_101', userRole = 'STUDENT', userName = 'Agent Maverick', avatar = 'agent_cyber' }) => {
      const roomChannel = `session_${sessionCode}`;
      socket.join(roomChannel);

      if (!activeSessions.has(sessionCode)) {
        activeSessions.set(sessionCode, new Map());
      }
      const roomRoster = activeSessions.get(sessionCode);
      const playerData = {
        socketId: socket.id,
        userName,
        userRole,
        avatar,
        joinedAt: new Date().toLocaleTimeString(),
        inspectingObject: null,
      };
      roomRoster.set(socket.id, playerData);

      console.log(`[Socket] ${userName} (${userRole}) joined channel: ${roomChannel}. Roster size: ${roomRoster.size}`);

      // Broadcast updated team roster to everyone in room
      io.to(roomChannel).emit('team_roster_updated', {
        sessionCode,
        players: Array.from(roomRoster.values()),
        totalPlayers: roomRoster.size,
      });

      // Broadcast single player joined notification
      io.to(roomChannel).emit('player_joined', {
        userName,
        userRole,
        timestamp: new Date().toISOString(),
      });
    });

    // 2. Broadcast 3D Object Inspection Target (Teammates see what objects each other are looking at)
    socket.on('inspect_object', ({ sessionCode = 'ROOM_101', objectName, userName }) => {
      const roomChannel = `session_${sessionCode}`;
      const roomRoster = activeSessions.get(sessionCode);
      if (roomRoster && roomRoster.has(socket.id)) {
        roomRoster.get(socket.id).inspectingObject = objectName;
      }

      socket.to(roomChannel).emit('teammate_inspecting', {
        userName,
        objectName,
        timestamp: new Date().toLocaleTimeString(),
      });
    });

    // 3. Stage Synchronization (When one player solves puzzle, advance all team members)
    socket.on('stage_cleared', ({ sessionCode = 'ROOM_101', stageNumber, clearedBy }) => {
      const roomChannel = `session_${sessionCode}`;
      console.log(`[Stage Sync] Session ${sessionCode} advanced to Stage ${stageNumber + 1} by ${clearedBy}`);

      io.to(roomChannel).emit('team_stage_advanced', {
        newStage: stageNumber + 1,
        clearedBy,
        message: `Stage ${stageNumber} completed by ${clearedBy}! Solenoid Lock disengaged.`,
        timestamp: new Date().toISOString(),
      });
    });

    // 4. Quick Team Chat Ping
    socket.on('send_team_ping', ({ sessionCode = 'ROOM_101', userName, message, pingType = 'info' }) => {
      const roomChannel = `session_${sessionCode}`;
      io.to(roomChannel).emit('team_ping_received', {
        userName,
        message,
        pingType,
        timestamp: new Date().toLocaleTimeString(),
      });
    });

    // 5. Answer attempt
    socket.on('submit_answer', ({ sessionCode = 'ROOM_101', challengeId, answer, userId }) => {
      console.log(`[Answer Submission] Session: ${sessionCode}, Challenge: ${challengeId}, Answer: ${answer}`);
      
      io.to(`session_${sessionCode}`).emit('answer_attempted', {
        challengeId,
        submittedBy: userId,
        status: 'PROCESSING',
      });
    });

    // 6. Game Master hint dispatch
    socket.on('send_hint', ({ sessionCode = 'ROOM_101', hintText, penaltyMinutes = 2 }) => {
      console.log(`[Hint Dispatched] Session: ${sessionCode}, Hint: ${hintText}`);
      io.to(`session_${sessionCode}`).emit('hint_received', {
        hintText,
        penaltyMinutes,
        timestamp: new Date().toISOString(),
      });
    });

    // 7. Hardware actuator override
    socket.on('trigger_actuator_override', ({ sessionCode = 'ROOM_101', actuatorId, action }) => {
      console.log(`[Actuator Override] Session: ${sessionCode}, Actuator: ${actuatorId}, Action: ${action}`);
      io.to(`session_${sessionCode}`).emit('actuator_triggered', {
        actuatorId,
        action,
        triggeredBy: 'GAME_MASTER',
      });
    });

    // 8. Disconnect Handler
    socket.on('disconnect', () => {
      console.log(`[WebSocket Client Disconnected] Socket ID: ${socket.id}`);
      
      // Remove player from active session rosters
      for (const [sessionCode, roomRoster] of activeSessions.entries()) {
        if (roomRoster.has(socket.id)) {
          const disconnectedUser = roomRoster.get(socket.id);
          roomRoster.delete(socket.id);
          const roomChannel = `session_${sessionCode}`;

          io.to(roomChannel).emit('team_roster_updated', {
            sessionCode,
            players: Array.from(roomRoster.values()),
            totalPlayers: roomRoster.size,
          });

          io.to(roomChannel).emit('player_left', {
            userName: disconnectedUser.userName,
            timestamp: new Date().toISOString(),
          });
          break;
        }
      }
    });
  });
};

module.exports = setupGameSockets;
