import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faAt, faMapMarkerAlt, faLink, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

import './bio.scss';

import config from '../../../_config';

const Bio = () => {
  const { comment, name, company, location, email, website, facebook, instagram, github } = config;
  return (
    <div className="bio">
      {!comment ? null : <span className="comment">{comment}</span>}
      {!name ? null : (
        <div className="bio-item name">
          <div className="icon-wrap">
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          <span>{name}</span>
        </div>
      )}

      {!company ? null : (
        <div className="bio-item company">
          <div className="icon-wrap">
            <FontAwesomeIcon icon={faAddressCard} />
          </div>
          <span>{company}</span>
        </div>
      )}

      {!location ? null : (
        <div className="bio-item location">
          <div className="icon-wrap">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <span>{location}</span>
        </div>
      )}

      {!email ? null : (
        <div className="bio-item email">
          <div className="icon-wrap">
            <FontAwesomeIcon icon={faAt} />
          </div>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      )}

      {!website ? null : (
        <div className="bio-item website">
          <div className="icon-wrap">
            <FontAwesomeIcon icon={faLink} />
          </div>

          <a href={website} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        </div>
      )}

      <div className="social">
        {!facebook ? null : (
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="facebook" />
          </a>
        )}
        {!instagram ? null : (
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="instagram" />
          </a>
        )}
        {!github ? null : (
          <a href={github} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="github" />
          </a>
        )}
      </div>
    </div>
  );
};

export default Bio;
