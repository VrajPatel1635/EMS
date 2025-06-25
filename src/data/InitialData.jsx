// src/data/initialData.js

// localStorage.clear() // This line should NOT be uncommented here in production code

export const initialEmployeesData = [
  {
    "id": 1,
    "firstname": "Aarav",
    "email": "aarav@example.com",
    "password": "111",
    // Note: taskCount is redundant if you calculate it from tasks array.
    // If you explicitly want to store it, ensure it's kept updated when tasks change.
    // My previous TaskListNum calculates it dynamically, which is safer.
    "taskCount": {
      "active": 1,
      "newTask": 1,
      "completed": 1,
      "failed": 1
    },
    "tasks": [
      {
        "title": "Submit Expense Report",
        "description": "Submit the monthly expense report for April.",
        "date": "2025-06-15",
        "category": "Finance",
        "active": false, // Initial status must match your logic if newTask is true
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Team Meeting",
        "description": "Attend weekly sync-up meeting.",
        "date": "2025-06-17",
        "category": "Meetings",
        "active": true, // Example active task
        "newTask": false,
        "completed": false,
        "failed": false
      },
      {
        "title": "Client Follow-up",
        "description": "Follow up with client on project status.",
        "date": "2025-06-14",
        "category": "Communication",
        "active": false,
        "newTask": false,
        "completed": true, // Example completed task
        "failed": false
      },
      {
        "title": "Review Performance",
        "description": "Review Q2 performance metrics.",
        "date": "2025-06-25",
        "category": "HR",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true // Example failed task
      }
    ]
  },
  {
    "id": 2,
    "firstname": "Priya",
    "email": "priya@example.com",
    "password": "111",
    "taskCount": {
      "active": 2,
      "newTask": 1,
      "completed": 1,
      "failed": 1
    },
    "tasks": [
      {
        "title": "Update Product Documentation",
        "description": "Revise outdated sections of the user manual.",
        "date": "2025-06-12",
        "category": "Documentation",
        "active": false,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Prepare Demo",
        "description": "Create and test the product demo for client pitch.",
        "date": "2025-06-19",
        "category": "Presentation",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      },
      {
        "title": "Code Review",
        "description": "Review merge requests assigned this week.",
        "date": "2025-06-16",
        "category": "Development",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Security Patch",
        "description": "Apply urgent security patches to server.",
        "date": "2025-06-13",
        "category": "IT",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ]
  },
  {
    "id": 3,
    "firstname": "Raj",
    "email": "raj@example.com",
    "password": "111",
    "taskCount": {
      "active": 1,
      "newTask": 1,
      "completed": 1,
      "failed": 1
    },
    "tasks": [
      {
        "title": "Design Mockups",
        "description": "Design mockups for the new landing page.",
        "date": "2025-06-18",
        "category": "Design",
        "active": false,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "UX Audit",
        "description": "Conduct a UX audit on the current app.",
        "date": "2025-06-16",
        "category": "Design",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Asset Handoff",
        "description": "Send final design assets to development team.",
        "date": "2025-06-17",
        "category": "Design",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ]
  },
  {
    "id": 4,
    "firstname": "Meera",
    "email": "meera@example.com",
    "password": "111",
    "taskCount": {
      "active": 2,
      "newTask": 1,
      "completed": 1,
      "failed": 1
    },
    "tasks": [
      {
        "title": "Write Blog Post",
        "description": "Write a blog post on recent tech trends.",
        "date": "2025-06-10",
        "category": "Content",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Newsletter Campaign",
        "description": "Draft and schedule the monthly newsletter.",
        "date": "2025-06-20",
        "category": "Marketing",
        "active": false,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "SEO Audit",
        "description": "Perform an SEO audit of the company website.",
        "date": "2025-06-15",
        "category": "Marketing",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      },
      {
        "title": "Social Media Plan",
        "description": "Develop a content calendar for social media.",
        "date": "2025-06-18",
        "category": "Marketing",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      }
    ]
  },
  {
    "id": 5,
    "firstname": "Karan",
    "email": "karan@example.com",
    "password": "111",
    "taskCount": {
      "active": 2,
      "newTask": 1,
      "completed": 1,
      "failed": 1
    },
    "tasks": [
      {
        "title": "Inventory Check",
        "description": "Perform a weekly inventory check in the warehouse.",
        "date": "2025-06-13",
        "category": "Operations",
        "active": false,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "title": "Vendor Meeting",
        "description": "Meet with supplier to discuss new contracts.",
        "date": "2025-06-16",
        "category": "Procurement",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "title": "Order Follow-up",
        "description": "Follow up on late product delivery orders.",
        "date": "2025-06-14",
        "category": "Logistics",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      },
      {
        "title": "Update SOPs",
        "description": "Update standard operating procedures for warehouse tasks.",
        "date": "2025-06-20",
        "category": "Operations",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      }
    ]
  }
];

export const initialAdminData = {
  "id": 1,
  "firstname": "Admin",
  "email": "admin@example.com",
  "password": "111"
};
