import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { IJob } from "./interfaces";

const _formData = {
  jobTitle: "",
  description: "",
  city: "",
};

const backendUrl = "http://localhost:5557";

function App() {
  const [formData, setFormData] = useState(_formData);
  const [jobs, setJobs] = useState<IJob[]>([]);

  // nicht wiederholen packen in eine fkt
  const getJobs = async () => {
    const _jobs = (await axios.get(`${backendUrl}/jobs`)).data;
    console.log(_jobs);
    setJobs(_jobs);
  };

  const handleFieldChange = (e: any, fieldName: string) => {
    e.preventDefault();
    const value = e.target.value;
    setFormData({ ...formData, [fieldName]: value });
  };

  //
  useEffect(() => {
    // nicht wiederholen für get jobs wir packen in eine fkt
    // (async () => {
    //   const response = (await axios.get(`${backendUrl}/jobs`)).data;
    //   console.log(response);
    //   setJobs(response);
    //})();
    getJobs();
  }, []);

  const handleSaveForm = (e: any) => {
    e.preventDefault();
    (async () => {
      const response = await axios.post(`${backendUrl}/jobs`, formData);
      getJobs();
      //form entleeren anch speichern
      setFormData(_formData);
      console.log("success");
    })();
  };
  const handleDeleteJob = (job: IJob) => {
    (async () => {
      const deleteJob = await axios.delete(`${backendUrl}/jobs/${job.id}`);
      getJobs();
    })();
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
            <div className="row">
              <label>City</label>
              <div>
                <select onClick={(e) => handleFieldChange(e, "city")}>
                  <option value={formData.city}>(Please Choose...)</option>
                  <option value="hamburg">Hamburg</option>
                  <option value="berlin">Berlin</option>
                  <option value="hannover">Hannover</option>
                  <option value="mainz">Mainz</option>
                </select>
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
                <div className="title">
                  {job.jobTitle} (
                  <span onClick={() => handleDeleteJob(job)} className="delete">
                    delete
                  </span>
                  )
                </div>
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
