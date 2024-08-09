"use client";
import React, { useEffect, useState } from 'react';

const FeedbackPopup = ({ apiKey }) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch(`https://www.popify.dev/api/embed?key=${apiKey}&framework=true`)
      .then(response => response.text())
      .then(data => {
        setHtmlContent(data);
      })
      .catch(error => {
        console.error('Error fetching HTML content:', error);
      });
  }, [apiKey]);

  useEffect(() => {
    if (htmlContent) {
      const div = document.createElement('div');
      div.innerHTML = htmlContent;
      const scripts = div.getElementsByTagName('script');

      for (let i = 0; i < scripts.length; i++) {
        const scriptTag = document.createElement('script');
        if (scripts[i].src) {
          scriptTag.src = scripts[i].src;
        } else {
          scriptTag.textContent = scripts[i].innerText;
        }
        document.body.appendChild(scriptTag);
      }
    }
  }, [htmlContent]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default FeedbackPopup;
