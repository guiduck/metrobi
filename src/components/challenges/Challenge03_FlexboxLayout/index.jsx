import { useState, useCallback } from "react";
import styles from "./styles.module.scss";

/**
 * Generate CSS for the target flexbox layout
 * @returns {string} CSS code for the layout
 */
export function generateLayoutCSS() {
  // TODO: This is where your solution would go
  // You need to design the CSS yourself!

  /* SOLUTION (uncomment to see the answer):
  return `
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  gap: 10px;
  padding: 10px;
}

.header {
  background-color: #17a2b8;
  color: white;
  padding: 20px;
  text-align: center;
  flex: 0 0 auto;
}

.main-content {
  display: flex;
  flex: 1;
  gap: 10px;
}

.left-section {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
}

.hero {
  background-color: #9c88dd;
  color: white;
  padding: 40px 20px;
  text-align: center;
  flex: 0 0 auto;
}

.content-row {
  display: flex;
  flex: 1;
  gap: 10px;
}

.main-content-area {
  background-color: #ffc107;
  color: black;
  padding: 20px;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.extra-content {
  background-color: #6c757d;
  color: white;
  padding: 20px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar {
  background-color: #28a745;
  color: white;
  padding: 20px;
  flex: 0 0 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-row {
  display: flex;
  gap: 10px;
  flex: 0 0 auto;
}

.related-images {
  background-color: #20c997;
  color: white;
  padding: 20px;
  flex: 2;
  text-align: center;
}

.popular-posts {
  background-color: #e83e8c;
  color: white;
  padding: 20px;
  flex: 1;
  text-align: center;
}

.footer {
  background-color: #fd7e14;
  color: white;
  padding: 20px;
  text-align: center;
  flex: 0 0 auto;
}`;
  */

  return "";
}

/**
 * Validate if the user's CSS matches the expected layout structure
 * @param {string} userCSS - User's CSS code
 * @returns {Object} Validation result with score and feedback
 */
export function validateLayoutCSS(userCSS) {
  const checks = [
    {
      test: /display:\s*flex/gi,
      points: 15,
      description: "Uses display: flex",
    },
    {
      test: /flex-direction:\s*column/gi,
      points: 10,
      description: "Uses flex-direction: column for main container",
    },
    {
      test: /flex:\s*1/gi,
      points: 15,
      description: "Uses flex: 1 for growing elements",
    },
    {
      test: /gap:\s*\d+px/gi,
      points: 10,
      description: "Uses gap property for spacing",
    },
    {
      test: /flex:\s*2/gi,
      points: 10,
      description: "Uses flex: 2 for main content area",
    },
    {
      test: /flex:\s*0\s+0\s+auto/gi,
      points: 10,
      description: "Uses flex: 0 0 auto for fixed sections",
    },
    {
      test: /align-items:\s*(center|flex-start|flex-end)/gi,
      points: 10,
      description: "Uses align-items for vertical alignment",
    },
    {
      test: /justify-content:\s*(center|flex-start|flex-end|space-between)/gi,
      points: 10,
      description: "Uses justify-content for horizontal alignment",
    },
    {
      test: /\.container/gi,
      points: 5,
      description: "Defines container class",
    },
    {
      test: /\.header/gi,
      points: 5,
      description: "Defines header class",
    },
  ];

  let totalScore = 0;
  const passedChecks = [];
  const failedChecks = [];

  checks.forEach((check) => {
    if (check.test.test(userCSS)) {
      totalScore += check.points;
      passedChecks.push(check);
    } else {
      failedChecks.push(check);
    }
  });

  const maxScore = checks.reduce((sum, check) => sum + check.points, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  return {
    score: totalScore,
    maxScore,
    percentage,
    passedChecks,
    failedChecks,
    isValid: percentage >= 70,
  };
}

/**
 * Challenge 3: Flexbox Layout Component
 * Recreate the target layout using Flexbox CSS
 */
export default function Challenge03_FlexboxLayout() {
  const [userCSS, setUserCSS] = useState("");
  const [validation, setValidation] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const handleValidate = useCallback(() => {
    const result = validateLayoutCSS(userCSS);
    setValidation(result);
  }, [userCSS]);

  const handleShowSolution = useCallback(() => {
    setShowSolution(true);
    setUserCSS(generateLayoutCSS());
  }, []);

  const handleReset = useCallback(() => {
    setUserCSS("");
    setValidation(null);
    setShowSolution(false);
  }, []);

  const startingCSS = `/* Your CSS here - recreate the layout shown above */
.container {
  /* Add your styles */
}

.header {
  /* Header styles */
}

.main-content {
  /* Main content container */
}

/* Add more classes as needed */`;

  return (
    <div className={styles.challenge}>
      <div className={styles.header}>
        <h3>📐 Flexbox Layout Recreation</h3>
        <p>Recreate the target layout using CSS Flexbox</p>
      </div>

      <div className={styles.content}>
        {/* Challenge Description */}
        <div className={styles.challengeDescription}>
          <h4>🎯 Your Challenge:</h4>
          <div className={styles.description}>
            <p>
              Create a responsive flexbox layout with the following
              requirements:
            </p>
            <ul>
              <li>Header spanning full width at the top</li>
              <li>Main content area with left section and sidebar</li>
              <li>
                Left section containing: Hero, Main Content (2x width), and
                Extra Content
              </li>
              <li>Sidebar with fixed 200px width</li>
              <li>
                Bottom row with Related Images (2x width) and Popular Posts
              </li>
              <li>Footer spanning full width at the bottom</li>
            </ul>
            <p className={styles.hint}>
              💡 <strong>Hint:</strong> Use flexbox containers and think about
              flex proportions!
            </p>
          </div>
        </div>

        {/* CSS Editor */}
        <div className={styles.editorSection}>
          <div className={styles.editorHeader}>
            <h4>✏️ CSS Editor:</h4>
            <div className={styles.editorActions}>
              <button onClick={handleValidate} className="btn primary">
                Validate CSS
              </button>
              <button onClick={handleShowSolution} className="btn">
                Show Solution
              </button>
              <button onClick={handleReset} className="btn">
                Reset
              </button>
            </div>
          </div>

          <textarea
            value={userCSS || startingCSS}
            onChange={(e) => setUserCSS(e.target.value)}
            className={styles.cssEditor}
            placeholder="Enter your CSS here..."
            rows="20"
          />
        </div>

        {/* Validation Results */}
        {validation && (
          <div className={styles.validationSection}>
            <h4>📊 Validation Results:</h4>
            <div className={styles.scoreDisplay}>
              <div
                className={`${styles.scoreCircle} ${
                  validation.isValid ? styles.valid : styles.invalid
                }`}
              >
                <span className={styles.percentage}>
                  {validation.percentage}%
                </span>
                <span className={styles.scoreText}>
                  {validation.score}/{validation.maxScore}
                </span>
              </div>
              <div className={styles.scoreDetails}>
                <div
                  className={`${styles.status} ${
                    validation.isValid ? styles.passed : styles.failed
                  }`}
                >
                  {validation.isValid
                    ? "✅ Layout Valid!"
                    : "❌ Needs Improvement"}
                </div>
                <p className={styles.scoreDescription}>
                  {validation.isValid
                    ? "Great job! Your CSS recreates the target layout correctly."
                    : "Keep trying! Check the feedback below for improvements."}
                </p>
              </div>
            </div>

            <div className={styles.checksGrid}>
              <div className={styles.passedChecks}>
                <h5>✅ Passed Checks ({validation.passedChecks.length}):</h5>
                {validation.passedChecks.map((check, index) => (
                  <div key={index} className={styles.checkItem}>
                    <span className={styles.checkPoints}>+{check.points}</span>
                    <span className={styles.checkDescription}>
                      {check.description}
                    </span>
                  </div>
                ))}
              </div>

              {validation.failedChecks.length > 0 && (
                <div className={styles.failedChecks}>
                  <h5>❌ Missing ({validation.failedChecks.length}):</h5>
                  {validation.failedChecks.map((check, index) => (
                    <div key={index} className={styles.checkItem}>
                      <span className={styles.checkPoints}>{check.points}</span>
                      <span className={styles.checkDescription}>
                        {check.description}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Live Preview */}
        {userCSS && (
          <div className={styles.previewSection}>
            <h4>👀 Live Preview:</h4>
            <div className={styles.previewFrame}>
              <style dangerouslySetInnerHTML={{ __html: userCSS }} />
              <div className="container">
                <div className="header">Header</div>
                <div className="main-content">
                  <div className="left-section">
                    <div className="hero">Hero</div>
                    <div className="content-row">
                      <div className="main-content-area">Main Content</div>
                      <div className="extra-content">Extra Content</div>
                    </div>
                  </div>
                  <div className="sidebar">Sidebar</div>
                </div>
                <div className="bottom-row">
                  <div className="related-images">Related Images</div>
                  <div className="popular-posts">Popular Posts</div>
                </div>
                <div className="footer">Footer</div>
              </div>
            </div>
          </div>
        )}

        {/* Hints */}
        <div className={styles.hintsSection}>
          <h4>💡 Hints:</h4>
          <ul className={styles.hintsList}>
            <li>
              Use <code>display: flex</code> on containers
            </li>
            <li>
              Use <code>flex-direction: column</code> for vertical layouts
            </li>
            <li>
              Use <code>flex: 1</code> to make elements grow and fill space
            </li>
            <li>
              Use <code>flex: 2</code> to make main content twice as wide
            </li>
            <li>
              Use <code>gap</code> property for consistent spacing
            </li>
            <li>
              Use <code>flex: 0 0 auto</code> for fixed-size elements
            </li>
            <li>
              The sidebar should be <code>200px</code> wide
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
