import React, { useState } from 'react';

interface InteractiveExampleProps {
  component: string;
  title?: string;
  description?: string;
  codeExample?: string;
  simulationType?: 'code-playground' | 'visualization' | 'quiz' | 'simulation';
}

const InteractiveExample: React.FC<InteractiveExampleProps> = ({
  component,
  title = `Interactive ${component} Example`,
  description = `Explore and interact with ${component} concepts through this hands-on example.`,
  codeExample,
  simulationType = 'code-playground'
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'visualize' | 'interact'>('code');
  const [userCode, setUserCode] = useState(codeExample || '');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Successfully executed ${component} code example!\n\nSample output would appear here based on your code.`);
      setIsRunning(false);
    }, 1000);
  };

  const handleResetCode = () => {
    setUserCode(codeExample || '');
    setOutput('');
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      margin: '20px 0',
      borderRadius: '8px',
      backgroundColor: '#fafafa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>{title}</h3>

      <p style={{ color: '#34495e', lineHeight: '1.6' }}>{description}</p>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #ddd',
        margin: '15px 0',
        flexWrap: 'wrap'
      }}>
        <button
          style={{
            padding: '10px 15px',
            backgroundColor: activeTab === 'code' ? '#3498db' : '#f1f1f1',
            color: activeTab === 'code' ? 'white' : '#333',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0',
            marginRight: '5px',
            marginBottom: '5px'
          }}
          onClick={() => setActiveTab('code')}
        >
          Code Editor
        </button>
        <button
          style={{
            padding: '10px 15px',
            backgroundColor: activeTab === 'visualize' ? '#3498db' : '#f1f1f1',
            color: activeTab === 'visualize' ? 'white' : '#333',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0',
            marginRight: '5px',
            marginBottom: '5px'
          }}
          onClick={() => setActiveTab('visualize')}
        >
          Visualization
        </button>
        <button
          style={{
            padding: '10px 15px',
            backgroundColor: activeTab === 'interact' ? '#3498db' : '#f1f1f1',
            color: activeTab === 'interact' ? 'white' : '#333',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px 4px 0 0',
            marginRight: '5px',
            marginBottom: '5px'
          }}
          onClick={() => setActiveTab('interact')}
        >
          Interact
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'code' && (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <h4 style={{ margin: 0, color: '#2c3e50' }}>Code Editor</h4>
            <div>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                style={{
                  backgroundColor: isRunning ? '#bdc3c7' : '#27ae60',
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '4px',
                  cursor: isRunning ? 'not-allowed' : 'pointer',
                  marginRight: '10px'
                }}
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button
                onClick={handleResetCode}
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '10px',
              fontFamily: 'monospace',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#fff',
              resize: 'vertical'
            }}
            placeholder={`Enter your ${component} code here...`}
          />

          {output && (
            <div style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#e8f4fd',
              border: '1px solid #3498db',
              borderRadius: '4px'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>Output:</h4>
              <pre style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: '14px'
              }}>
                {output}
              </pre>
            </div>
          )}
        </div>
      )}

      {activeTab === 'visualize' && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '4px',
          border: '1px solid #eee'
        }}>
          <h4 style={{ color: '#2c3e50', marginBottom: '15px' }}>Interactive Visualization</h4>
          <div style={{
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            border: '1px dashed #ccc',
            borderRadius: '4px',
            margin: '10px 0'
          }}>
            <div>
              <p style={{ color: '#7f8c8d' }}>Interactive visualization for {component} would appear here</p>
              <p style={{ color: '#95a5a6', fontSize: '14px' }}>
                This could be a 3D simulation, graph, or interactive diagram
              </p>
            </div>
          </div>
          <p style={{ color: '#7f8c8d', fontSize: '14px', fontStyle: 'italic' }}>
            Visualization controls would allow students to manipulate parameters and see real-time results
          </p>
        </div>
      )}

      {activeTab === 'interact' && (
        <div>
          <h4 style={{ color: '#2c3e50', marginBottom: '15px' }}>Interactive Quiz</h4>
          <div style={{
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #eee'
          }}>
            <p style={{ color: '#34495e', marginBottom: '15px' }}>
              Test your understanding of {component} concepts:
            </p>

            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontWeight: 'bold', color: '#2c3e50' }}>Q: What is a key concept in {component}?</p>
              <div style={{ marginLeft: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  <input type="radio" name="quiz" style={{ marginRight: '8px' }} />
                  Option A
                </label>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  <input type="radio" name="quiz" style={{ marginRight: '8px' }} />
                  Option B
                </label>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  <input type="radio" name="quiz" style={{ marginRight: '8px' }} />
                  Option C
                </label>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  <input type="radio" name="quiz" style={{ marginRight: '8px' }} />
                  Option D
                </label>
              </div>
            </div>

            <button
              style={{
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Submit Answer
            </button>
          </div>
        </div>
      )}

      <div style={{
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#e8f6f3',
        borderLeft: '4px solid #1abc9c',
        borderRadius: '0 4px 4px 0'
      }}>
        <p style={{ margin: 0, color: '#27ae60', fontWeight: 'bold' }}>
          💡 Tip: Try modifying the code and running it to see how {component} concepts work in practice.
        </p>
      </div>
    </div>
  );
};

export default InteractiveExample;
