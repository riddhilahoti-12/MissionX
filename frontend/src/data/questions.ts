export interface Question {
  id: string;
  subjectId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Subject {
  slug: string;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
}

export const SUBJECTS: Subject[] = [
  {
    slug: 'data-structures',
    name: 'Data Structures',
    description: 'Arrays, Stacks, Queues, Trees, Heaps, and Graph algorithms.',
    icon: 'Network',
    questionCount: 5,
  },
  {
    slug: 'dbms',
    name: 'DBMS',
    description: 'Relational model, Normalization, SQL Joins, ACID, and Transactions.',
    icon: 'Database',
    questionCount: 5,
  },
  {
    slug: 'operating-systems',
    name: 'Operating Systems',
    description: 'Processes, CPU Scheduling, Deadlocks, Paging, and Memory Thrashing.',
    icon: 'Cpu',
    questionCount: 5,
  },
  {
    slug: 'computer-networks',
    name: 'Computer Networks',
    description: 'OSI 7-Layer Architecture, TCP/IP, Routing, DHCP, and Subnetting.',
    icon: 'Globe',
    questionCount: 5,
  },
];

export const QUESTIONS_DATA: Record<string, Question[]> = {
  'data-structures': [
    {
      id: 'ds_1',
      subjectId: 'data-structures',
      question: 'What is the worst-case time complexity of searching an element in an unbalanced Binary Search Tree (BST)?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 2,
      explanation: 'In the worst case (e.g. elements inserted in sorted order), an unbalanced BST degenerates into a linear linked list with O(n) search time.',
      difficulty: 'Easy',
    },
    {
      id: 'ds_2',
      subjectId: 'data-structures',
      question: 'Which data structure strictly operates on the Last-In, First-Out (LIFO) principle?',
      options: ['Queue', 'Stack', 'Circular Buffer', 'Priority Queue'],
      correctAnswer: 1,
      explanation: 'A Stack stores items in a LIFO order where the most recently added item is the first one popped off.',
      difficulty: 'Easy',
    },
    {
      id: 'ds_3',
      subjectId: 'data-structures',
      question: 'What is the average time complexity for key lookup in a Hash Table with good distribution?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
      correctAnswer: 2,
      explanation: 'With a uniform hash function and minimal collisions, hash table lookups take O(1) constant average time.',
      difficulty: 'Medium',
    },
    {
      id: 'ds_4',
      subjectId: 'data-structures',
      question: 'In a Max-Heap data structure with n nodes, where is the maximum value always guaranteed to reside?',
      options: ['At any leaf node', 'At the root node', 'At index n/2', 'At the leftmost leaf'],
      correctAnswer: 1,
      explanation: 'In a Max Heap, every parent node is greater than or equal to its children, placing the overall maximum at the root node.',
      difficulty: 'Medium',
    },
    {
      id: 'ds_5',
      subjectId: 'data-structures',
      question: "Which algorithmic paradigm is the foundation of Dijkstra's Single-Source Shortest Path algorithm?",
      options: ['Greedy Algorithm', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking'],
      correctAnswer: 0,
      explanation: "Dijkstra's algorithm is greedy: at each iteration, it commits to the unvisited vertex with the minimum provisional distance.",
      difficulty: 'Hard',
    },
  ],
  'dbms': [
    {
      id: 'dbms_1',
      subjectId: 'dbms',
      question: 'What does the ACID acronym stand for in database transaction management?',
      options: [
        'Atomicity, Consistency, Isolation, Durability',
        'Accuracy, Control, Integrity, Data',
        'Access, Control, Isolation, Database',
        'Atomicity, Control, Integrity, Dependency',
      ],
      correctAnswer: 0,
      explanation: 'ACID guarantees reliable transactions: Atomicity (all-or-nothing), Consistency (state integrity), Isolation (concurrency control), and Durability (permanent persistence).',
      difficulty: 'Easy',
    },
    {
      id: 'dbms_2',
      subjectId: 'dbms',
      question: 'Which Normal Form eliminates partial functional dependencies on composite candidate keys?',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      correctAnswer: 1,
      explanation: 'Second Normal Form (2NF) enforces that every non-prime attribute is fully functionally dependent on the primary key, eliminating partial dependencies.',
      difficulty: 'Medium',
    },
    {
      id: 'dbms_3',
      subjectId: 'dbms',
      question: 'Which SQL join returns all rows from the left table along with matching rows from the right table?',
      options: ['INNER JOIN', 'FULL OUTER JOIN', 'LEFT OUTER JOIN', 'CROSS JOIN'],
      correctAnswer: 2,
      explanation: 'LEFT OUTER JOIN returns every row from the left table, populating NULL for right table columns when no match exists.',
      difficulty: 'Easy',
    },
    {
      id: 'dbms_4',
      subjectId: 'dbms',
      question: 'Which SQL command is classified under Data Control Language (DCL)?',
      options: ['GRANT', 'ALTER', 'UPDATE', 'DROP'],
      correctAnswer: 0,
      explanation: 'GRANT and REVOKE are Data Control Language (DCL) commands used to manage database privileges and security permissions.',
      difficulty: 'Medium',
    },
    {
      id: 'dbms_5',
      subjectId: 'dbms',
      question: 'Which transaction isolation level prevents dirty reads, non-repeatable reads, and phantom reads?',
      options: ['Read Committed', 'Repeatable Read', 'Read Uncommitted', 'Serializable'],
      correctAnswer: 3,
      explanation: 'Serializable provides the highest isolation by simulating sequential execution, eliminating dirty reads, non-repeatable reads, and phantom rows.',
      difficulty: 'Hard',
    },
  ],
  'operating-systems': [
    {
      id: 'os_1',
      subjectId: 'operating-systems',
      question: 'Which core operating system component executes with supervisor CPU privileges to arbitrate hardware resources?',
      options: ['Command Shell', 'Kernel', 'Compiler', 'Bootloader Utility'],
      correctAnswer: 1,
      explanation: 'The kernel is the foundational heart of the OS that operates in privileged ring-0/kernel mode with unrestricted access to CPU registers and devices.',
      difficulty: 'Easy',
    },
    {
      id: 'os_2',
      subjectId: 'operating-systems',
      question: "Which of the following is NOT one of Coffman's four mandatory conditions for a system deadlock to occur?",
      options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption Allowed', 'Circular Wait'],
      correctAnswer: 2,
      explanation: "Coffman's condition is 'No Preemption'. If preemption is allowed, deadlock cannot occur because the OS can reclaim resources.",
      difficulty: 'Medium',
    },
    {
      id: 'os_3',
      subjectId: 'operating-systems',
      question: 'What is the condition where an operating system spends more time handling page faults than executing actual CPU instructions?',
      options: ['Thrashing', 'Starvation', "Belady's Anomaly", 'Internal Fragmentation'],
      correctAnswer: 0,
      explanation: 'Thrashing occurs when virtual memory working sets exceed physical memory capacity, triggering an unending cycle of page-ins and page-outs.',
      difficulty: 'Medium',
    },
    {
      id: 'os_4',
      subjectId: 'operating-systems',
      question: 'Which CPU scheduling algorithm assigns each ready process a fixed time quantum in cyclical sequence?',
      options: ['Shortest Job First', 'First-Come First-Served', 'Round Robin (RR)', 'Multilevel Queue'],
      correctAnswer: 2,
      explanation: 'Round Robin (RR) shares CPU time fairly by allocating a discrete time slice (quantum) to each runnable task in a FIFO circular queue.',
      difficulty: 'Easy',
    },
    {
      id: 'os_5',
      subjectId: 'operating-systems',
      question: 'What synchronization primitive is an integer variable accessed exclusively through atomic wait() (P) and signal() (V) operations?',
      options: ['Semaphore', 'Spinlock', 'Condition Variable', 'Memory Barrier'],
      correctAnswer: 0,
      explanation: 'A Semaphore, introduced by Dijkstra, is an atomic integer synchronization tool modified solely via wait() (decrement) and signal() (increment).',
      difficulty: 'Hard',
    },
  ],
  'computer-networks': [
    {
      id: 'cn_1',
      subjectId: 'computer-networks',
      question: 'At which layer of the standard 7-layer OSI model do packet routers primarily operate?',
      options: ['Layer 1 (Physical)', 'Layer 2 (Data Link)', 'Layer 3 (Network)', 'Layer 4 (Transport)'],
      correctAnswer: 2,
      explanation: 'Routers inspect destination IP headers and make routing decisions at Layer 3 (Network Layer) of the OSI model.',
      difficulty: 'Easy',
    },
    {
      id: 'cn_2',
      subjectId: 'computer-networks',
      question: 'What is the defining operational distinction between TCP and UDP?',
      options: [
        'TCP is connection-oriented and reliable, while UDP is connectionless and best-effort',
        'TCP operates at Layer 3, while UDP operates at Layer 4',
        'UDP provides automatic error retransmission, while TCP does not',
        'UDP can only transmit encrypted banking packets',
      ],
      correctAnswer: 0,
      explanation: 'TCP guarantees sequence order and delivery through acknowledgments and retransmission, while UDP prioritizes speed with lightweight stateless datagrams.',
      difficulty: 'Easy',
    },
    {
      id: 'cn_3',
      subjectId: 'computer-networks',
      question: 'Which network protocol dynamically assigns IP configurations and gateway parameters to host workstations?',
      options: ['DNS', 'DHCP', 'ARP', 'ICMP'],
      correctAnswer: 1,
      explanation: 'Dynamic Host Configuration Protocol (DHCP) automatically assigns IP addresses, subnet masks, default gateways, and DNS server addresses.',
      difficulty: 'Medium',
    },
    {
      id: 'cn_4',
      subjectId: 'computer-networks',
      question: 'What standard well-known TCP port is designated for encrypted HTTPS web communication?',
      options: ['Port 80', 'Port 22', 'Port 443', 'Port 8080'],
      correctAnswer: 2,
      explanation: 'Port 443 is universally standardized for Hypertext Transfer Protocol Secure (HTTPS) over TLS/SSL.',
      difficulty: 'Easy',
    },
    {
      id: 'cn_5',
      subjectId: 'computer-networks',
      question: 'In standard IPv4 CIDR addressing, how many usable host IP addresses are available in a /24 subnet?',
      options: ['254', '256', '512', '128'],
      correctAnswer: 0,
      explanation: 'A /24 subnet reserves 8 bits for host IDs (2^8 = 256). Excluding the network ID (0) and broadcast address (255) leaves exactly 254 usable host addresses.',
      difficulty: 'Medium',
    },
  ],
};
