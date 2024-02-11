import "./App.scss";

function App() {
  return (
    <div>
      <h1>To Do App</h1>
      <p>Welcome to this site.</p>
      <form>
        <fieldset>
          <legend>New Subject</legend>
          <div className="row">
            <label>Title</label>
            <div>
              <input type="text" />
            </div>
          </div>
          <div className="row">
            <label>Description</label>
            <div>
              <textarea />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
