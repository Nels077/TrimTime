import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  const containerStyle = {
    textAlign: 'center',
    marginTop: '100px',
  };

  const headingStyle = {
    fontSize: '3em',
    color: '#e74c3c',
  };

  const paragraphStyle = {
    fontSize: '1.2em',
    color: '#555',
    marginBottom: '20px',
  };

  const linkStyle = {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.2em',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404 - Not Found</h1>
      <p style={paragraphStyle}>Sorry, the page you are looking for might be in another castle.</p>
      <Link to="/" style={linkStyle}>
        Go back home
      </Link>
    </div>
  );
};

export default Page404;
