import React from 'react';
import useCollapse from 'react-collapsed';
import question_data from '../public/help_questions.json';
import styles from './help.module.css'

function Collapsible(props, question, answer) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className={styles.collapsible}>
      <div className="header" {...getToggleProps()}>
        {isExpanded ? props.question : props.question}
      </div>
      <div {...getCollapseProps()}>
        <div className={styles.content}>
          {props.answer}
        </div>
      </div>
    </div>
  );
}



export default function help() {
  // TODO: There is a hydration error here
  const questions_html = question_data.data.map((section) => {
    const group_html = [];

    section.data.forEach((group) => {
      const question_html = [];

      group.data.forEach((questions) => {
        question_html.push(
          <div className={styles.question} key={questions.question}>
            <Collapsible question={questions.question} answer={questions.answer} />
          </div>
        );
      });

      group_html.push(
        <div className={styles.questions_container} key={group.name}>
          <h2 className={styles.question_group_title}>{group.name}</h2>
          {question_html}
        </div>
      );
    });

    return (
      <div className={styles.section_container} key={section.name}>
        <h1 className={styles.section_title}>{section.name}</h1>
        {group_html}
      </div>
    );
  });


  return (
    <div>
      <div>
        <h1 className={styles.section_title}>About us</h1>
        <p className={styles.section_text}>
          At WorkShare, we aim to help you achieve your creative goals by helping you find the space you need, for cheap.
        </p>
        <p className={styles.section_text}>
          We at the WorkShare team are committed to providing our partners, hosts, and renters with an ideal environment to make sure they have the best experience possible. Property owners who wish to enable others to lease their workspace can use our platform to reach thousands of potential customers. Conversely, creatives can use our platform to find the ideal workspace for them to get started with their creative endeavors. But what is a workspace? A workspace is anywhere our customers can work on their projects and these workspaces are provided by our partners who we call hosts.
        </p>
      </div>

      <div className={styles.section_title}>
        <h1>Help</h1>
      </div>

      {questions_html}

    </div>
  );
}
