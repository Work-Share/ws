import React from 'react';
import styles from './help.module.css'
import question_data from '../public/help_questions.json';
import useCollapse from 'react-collapsed';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Link from 'next/link';

function Collapsible(props, question, answer) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className={styles.collapsible}>
      <div className={styles.question} {...getToggleProps()}>
        {isExpanded ? props.question : props.question}
      </div>
      <div {...getCollapseProps()}>
        <div className={styles.answer}>
          {props.answer}
        </div>
      </div>
    </div>
  );
}

export default function Help() {
  const content_html = [];
  var question_html = [];

  const questions_html = question_data.data.map((section) => {
    const group_html = [];

    content_html.push(
      <ul key={section.name}>
        <li className={styles.big_section}><AnchorLink href={`#${section.name}`}>{section.name}</AnchorLink></li>
        <ul>
          {section.data.map((group) => {
            return <li key={group.name} className={styles.small_section}><AnchorLink href={`#${group.name}`}>{group.name}</AnchorLink></li>
          })}
        </ul>
      </ul>
    )

    section.data.forEach((group) => {
      group.data.forEach((questions) => {
        question_html.push(
          <Collapsible key={questions.question} question={questions.question} answer={questions.answer} />
        );
      });

      group_html.push(
        <div className={styles.questions_container} id={group.name} key={group.name}>
          <h2 className={styles.question_group_title}>{group.name}</h2>
          {question_html}
        </div>
      );

      question_html = []
    });

    return (
      <div className={styles.section_container} key={section.name} id={section.name}>
        <h1 className={styles.section_title}>{section.name}</h1>
        {group_html}
      </div>
    );
  });


  return (
    <div>
      <h1 className={styles.section_title}>Help</h1>

      <div className={styles.table_of_contents}>
        <div className={styles.content_container}>
          {content_html}
        </div>
      </div>
      {questions_html}

      <h1 className={styles.section_title}>Get Started</h1>
      <div className={styles.get_started}>
        <div className={styles.get_started_section}>
          <h2>Start Searching for properties to rent</h2>
          <Link passHref href="/search"><button>Search</button></Link>
        </div>
        <div className={styles.get_started_section}>
          <h2>Become a host and post your properties</h2>
          <Link passHref href="/auth/signup"><button>Sign Up</button></Link>
        </div>
      </div>

    </div>
  );
}
