const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject.model');
const Question = require('../models/Question.model');

// Default fallback subjects
const DEFAULT_SUBJECTS = [
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

// @route GET /api/subjects
router.get('/', async (req, res) => {
  try {
    let subjects = await Subject.find().sort({ createdAt: 1 });
    if (!subjects || subjects.length === 0) {
      subjects = DEFAULT_SUBJECTS;
    }
    res.json({ success: true, count: subjects.length, subjects });
  } catch (error) {
    res.json({ success: true, count: DEFAULT_SUBJECTS.length, subjects: DEFAULT_SUBJECTS });
  }
});

// @route GET /api/subjects/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let subject = await Subject.findOne({ slug: id });
    if (!subject) {
      subject = DEFAULT_SUBJECTS.find((s) => s.slug === id);
    }
    if (!subject) {
      return res.status(404).json({ success: false, message: 'Subject not found' });
    }
    res.json({ success: true, subject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
