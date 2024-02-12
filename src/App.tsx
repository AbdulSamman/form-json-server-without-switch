import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { IJob } from "./interfaces";

const _formData = {
  jobTitle: "",
  description: "",
};

const backendUrl = "http://localhost:5557";

function App() {
  const [formData, setFormData] = useState(_formData);

  const [jobs, setJobs] = useState<IJob[]>([]);

  const handleFieldChange = (e: any, fieldName: string) => {
    e.preventDefault();
    const value = e.target.value;
    //statevariable value ändern
    // einzeln
    //formData.jobTitle = value;
    //setFormData({ ...formData });

    //mehrere
    // switch (fieldName) {
    //   case "jobTitle":
    //     formData.jobTitle = value;
    //     break;
    //   case "description":
    //     formData.description = value;
    //     break;
    // }
    //   setFormData({ ...formData });
    // oder

    setFormData({ ...formData, [fieldName]: value });
  };

  //
  useEffect(() => {
    (async () => {
      const response = (await axios.get(`${backendUrl}/jobs`)).data;
      console.log(response);
      setJobs(response);
    })();
  }, []);

  const handleSaveForm = (e: any) => {
    e.preventDefault();
    console.log("redd");
  };

  return (
    <div className="App">
      <h1>To Do App</h1>

      <section>
        <form>
          <fieldset>
            <legend>New Subject</legend>
            <div className="row">
              <label>Title</label>
              <div>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleFieldChange(e, "jobTitle")}
                />
              </div>
            </div>
            <div className="row">
              <label>Description</label>
              <div>
                <textarea
                  spellCheck="false"
                  value={formData.description}
                  onChange={(e) => handleFieldChange(e, "description")}
                />
              </div>
            </div>
            <div className="buttonArea">
              <button onClick={(e) => handleSaveForm(e)}>Save</button>
            </div>
          </fieldset>
        </form>

        <div className="currentJobs">
          <h2>There are {jobs.length} jobs.</h2>

          {jobs.map((job) => {
            return (
              <div key={job.id} className="job">
                <div className="title">{job.jobTitle}</div>
              </div>
            );
          })}
        </div>
        <div className="debuggingArea">
          <pre className="showData">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
}

export default App;
