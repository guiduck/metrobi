import React from "react";
import styles from "./styles.module.scss";

export default function Challenge03_FlexboxLayout() {
  return (
    <div className={styles.challenge}>
      <div className={styles.header}>
        <h3>📐 Flexbox Layout</h3>
        <p>React code for generating the below figure (using flex)</p>
      </div>

      <div className={styles.content}>
        <div className={styles.layoutContainer}>
          <div className={styles.headerSection}>Header</div>

          <div className={styles.mainSection}>
            <div className={styles.leftSection}>
              <div className={styles.hero}>Hero</div>
              <div className={styles.contentRow}>
                <div className={styles.mainContent}>
                  Main Content
                  <div className={styles.contentSubtext}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>
                </div>
                <div className={styles.extraContent}>Extra Content</div>
              </div>
            </div>
            <div className={styles.sidebar}>Sidebar</div>
          </div>

          <div className={styles.bottomSection}>
            <div className={styles.relatedImages}>Related Images</div>
            <div className={styles.relatedPosts}>Related Posts</div>
          </div>

          <div className={styles.footerSection}>Footer</div>
        </div>
      </div>
    </div>
  );
}
