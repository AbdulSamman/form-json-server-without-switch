import "./App.scss";
import { useState } from "react";

const _formData = {
  jobTitle: "",
  description: "",
};

function App() {
  const [formData, setFormData] = useState(_formData);

  const handleFieldChange = (e: any, fieldName: string) => {
    const value = e.target.value;
    //statevariable value ändern
    // einzel
    //formData.jobTitle = value;
    //setFormData({ ...formData });
    //mehrere
    switch (fieldName) {
      case "jobTitle":
        formData.jobTitle = value;
        break;
      case "description":
        formData.description = value;
        break;
    }
    setFormData({ ...formData });
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
              <button>Save</button>
            </div>
          </fieldset>
        </form>
        <div className="debuggingArea">
          <pre className="showData">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
}

export default App;
