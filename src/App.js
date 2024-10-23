import React, { useState } from 'react';
import {axiosInstance} from "./config"
// import axios from 'axios';
import "./App.css"
function RuleEngine() {
  // State for rule creation
  const [ruleName, setRuleName] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [createdRule, setCreatedRule] = useState(null);

  // State for rule evaluation
  const [userData, setUserData] = useState({
    age: '',
    department: '',
    salary: '',
    experience: ''
  });
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Create rule function
  const handleCreateRule = async () => {
    try {
      const response = await axiosInstance.post('/create-rule', {
        ruleName,
        ruleString
      });
      setCreatedRule(response.data.rule);
      alert('Rule created successfully!');
    } catch (error) {
      console.error('Error creating rule:', error);
      alert('Error creating rule');
    }
  };

  // Evaluate rule function
  const handleEvaluateRule = async () => {
    try {
      if (!createdRule) {
        alert('Please create a rule first');
        return;
      }

      const response = await axiosInstance.post('/evaluate-rule', {
        rule: createdRule,
        data: userData
      });
      setEvaluationResult(response.data.result);
    } catch (error) {
      console.error('Error evaluating rule:', error);
      alert('Error evaluating rule');
    }
  };

  // Handle user data input
  const handleUserDataChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2>Rule Engine</h2>

      <div>
        <h3>Create a Rule</h3>
        <input
          type="text"
          placeholder="Rule Name Eg: ABC"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Rule String Eg : (salary > 50000 OR experience > 5)"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
        />
        <br />
        <button onClick={handleCreateRule}>Create Rule</button>
      </div>

      {/* Section for evaluating a rule */}
      {createdRule && (
        <div>
          <h3>Evaluate Rule</h3>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleUserDataChange}
            />
          </label>
          <br />
          <label>
            Department:
            <input
              type="text"
              name="department"
              value={userData.department}
              onChange={handleUserDataChange}
            />
          </label>
          <br />
          <label>
            Salary:
            <input
              type="number"
              name="salary"
              value={userData.salary}
              onChange={handleUserDataChange}
            />
          </label>
          <br />
          <label>
            Experience:
            <input
              type="number"
              name="experience"
              value={userData.experience}
              onChange={handleUserDataChange}
            />
          </label>
          <br />
          <button onClick={handleEvaluateRule}>Evaluate Rule</button>

          {evaluationResult !== null && (
            <div>
              <h4>Evaluation Result:</h4>
              <p>{evaluationResult ? 'User is eligible' : 'User is not eligible'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RuleEngine;
