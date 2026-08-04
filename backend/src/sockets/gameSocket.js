const setupGameSockets = (io) => {
  io.on('connection', (socket) => {
    console.log(`[WebSocket Client Connected] Socket ID: ${socket.id}`);

    // Join room session
    socket.on('join_session', ({ sessionCode, userRole, userName }) => {
      const roomChannel = `session_${sessionCode}`;
      socket.join(roomChannel);
      console.log(`[Socket] ${userName} (${userRole}) joined channel: ${roomChannel}`);

      io.to(roomChannel).emit('player_joined', {
        userName,
        userRole,
        timestamp: new Date().toISOString(),
      });
    });

    // Answer attempt
    socket.on('submit_answer', ({ sessionCode, challengeId, answer, userId }) => {
      console.log(`[Answer Submission] Session: ${sessionCode}, Challenge: ${challengeId}, Answer: ${answer}`);
      
      io.to(`session_${sessionCode}`).emit('answer_attempted', {
        challengeId,
        submittedBy: userId,
        status: 'PROCESSING',
      });
    });

    // Game Master hint dispatch
    socket.on('send_hint', ({ sessionCode, hintText, penaltyMinutes = 2 }) => {
      console.log(`[Hint Dispatched] Session: ${sessionCode}, Hint: ${hintText}`);
      io.to(`session_${sessionCode}`).emit('hint_received', {
        hintText,
        penaltyMinutes,
        timestamp: new Date().toISOString(),
      });
    });

    // Hardware actuator override
    socket.on('trigger_actuator_override', ({ sessionCode, actuatorId, action }) => {
      console.log(`[Actuator Override] Session: ${sessionCode}, Actuator: ${actuatorId}, Action: ${action}`);
      io.to(`session_${sessionCode}`).emit('actuator_triggered', {
        actuatorId,
        action,
        triggeredBy: 'GAME_MASTER',
      });
    });

    socket.on('disconnect', () => {
      console.log(`[WebSocket Client Disconnected] Socket ID: ${socket.id}`);
    });
  });
};

module.exports = setupGameSockets;
