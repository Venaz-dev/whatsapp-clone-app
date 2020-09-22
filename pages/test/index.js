import React from "react";
import { useRouter } from "next/router";

const About = () => {
  const router = useRouter();
  const { pid, sub } = router.query;
  const value = "gest"

  return (
    <div>
      <h1>
        testing query = {pid}
        <br></br>
        testing sub = {sub}
      </h1>
      <div>
          <h2 style={{color: sub === 'gest' ? 'red' : 'blue'}}>
              gest
          </h2>
      </div>
      <span
        onClick={() => {
          router.push({
            query: { sub: value },
          });
        }}
      >
        Click here to read more
      </span>
    </div>
  );
};

export default About;
