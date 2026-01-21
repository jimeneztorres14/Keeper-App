# 📒 Keeper App 

A simple and intuitive note-taking application built with React.
The Keeper App is a browser-based notes application that allows users to create, view, update, and delete notes.

# Manual QA Testing Project

A React-based note-taking web application tested to demonstrate manual testing, test design, defect discovery, and QA documentation skills using a real-world workflow.

This project focuses on test scenario creation, execution, defect reporting, and fix verification, with **Trello used as the test management tool**.

## Live Demo

The application is deployed on Vercel and available at: 
https://keeper-app-delta-puce.vercel.app/

Manual testing validated Create, Update, and Delete functionality, including data persistence after page refresh.
**Trello Test Board:** https://trello.com/b/yvYg7uTU

---

## 📌 Project Overview

Manual testing was conducted to validate:
- Core CRUD functionality (Create, Read, Update, Delete)
- Input validation and negative scenarios
- UI behavior and user feedback
- Data persistence after refresh
- Defect identification and resolution

---

## Testing Scope

###Manual testing was performed across the following areas:

- Note creation (valid, invalid, and boundary inputs)
- Note deletion behavior
- Update/Edit note functionality
- Validation rules for empty inputs
- UI confirmation messages (create/update/delete)
- Order and integrity of notes after actions
- Data persistence after page refresh
- Regression testing after feature updates

---

## Test Cases & Scenarios

- **Total Test Cases Created:** 32  
- **Testing Type:** Manual Testing  
- **Test Design:** Scenario-based and negative testing  
- **Test Management Tool:** Trello  

**Trello Test Board:** https://trello.com/b/yvYg7uTU

The Trello board includes:
- Test scenarios organized by feature (Create, Delete, Update, Validation)
- Execution status (Pass / Fail / Blocked)
- Defect tracking and notes

---

## 🐞 Defect Tracking

During test execution, a **functional gap** was identified:

- The application did not provide an option to **edit or update existing notes**.
- Users were forced to delete and recreate notes to make changes.

The defect was documented with:
- Clear reproduction steps
- Expected vs actual behavior
- Severity and priority
- Traceability within Trello

### Defect Resolution
- The Update/Edit feature was later implemented.
- Manual re-testing and regression testing were performed.
- The defect was verified as **fixed** after successful validation.

This demonstrates the **full defect lifecycle**, from discovery to verification.

---

## 🔁 Regression Testing

Regression testing was performed after implementing the Update/Edit functionality to confirm that existing Create and Delete features continued to work as expected.

---

## 📊 Test Execution Summary

- Test cases executed: **32**
- Passed: **32**
- Failed: **0**
- Blocked: **0**

> All test cases passed after the Update/Edit feature was implemented and verified.

---

## 🛠 Tools & Technologies

- Manual Testing
- Trello (Test Management)
- React
- PostgreSQL (Neon)
- Git & GitHub
- Vercel (Deployment)

---

## Learning Outcomes

This project demonstrates:
- Manual test case design and execution
- Use of Trello as a test management tool
- Functional and regression testing
- Defect identification, documentation, and verification
- Validation of real-world CRUD web applications
- Collaboration between testing and development changes

---

## Author

**Ruben Jimenez**  
QA / Manual Testing Project  

---

## Notes for Reviewers

This repository is intended to showcase **QA and manual testing skills**, not only application development.  
Testing artifacts, execution evidence, and defect tracking can be reviewed directly in the Trello board linked above.


👤 Author

Ruben Jimenez
Manual Testing Project

GitHub: https://github.com/jimeneztorres14
