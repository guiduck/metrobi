import React from "react";
import styles from "./styles.module.scss";

export default function Challenge03_FlexboxLayout() {
  return (
    <article className={styles.challenge}>
      <header className={styles.header}>
        <h1>📐 Flexbox Layout Challenge</h1>
        <p>Create responsive layouts using modern CSS Flexbox techniques</p>
      </header>

      <main className={styles.content}>
        <section className={styles.layoutDemo} aria-labelledby="demo-heading">
          <h2 id="demo-heading" className="sr-only">
            Demonstration
          </h2>

          <div
            className={styles.layoutContainer}
            role="region"
            aria-label="Flexbox layout example"
          >
            <header className={styles.headerSection}>
              <h3>Header</h3>
            </header>

            <div className={styles.mainSection}>
              <aside className={styles.leftSection}>
                <section className={styles.hero}>
                  <h4>Hero</h4>
                </section>
                <nav className={styles.sidebar} aria-label="Main navigation">
                  <h4>Sidebar</h4>
                </nav>
              </aside>

              <main className={styles.contentColumn}>
                <section className={styles.mainContent}>
                  <h4>Main Content</h4>
                  <p className={styles.contentSubtext}>
                    Primary article content and information. This demonstrates
                    how flexbox can create flexible, responsive layouts that
                    adapt to different screen sizes.
                  </p>
                </section>
                <aside className={styles.extraContent}>
                  <h5>Extra Content</h5>
                </aside>
              </main>
            </div>

            <section className={styles.bottomSection}>
              <div className={styles.relatedImages}>
                <h4>Related Images</h4>
              </div>
              <aside className={styles.relatedPosts}>
                <h4>Related Posts</h4>
              </aside>
            </section>

            <footer className={styles.footerSection}>
              <h4>Footer</h4>
            </footer>
          </div>
        </section>
      </main>
    </article>
  );
}
