import { Button, Grid } from "@mui/material";
import ContactForm from "./component/ContactForm";
import ContactList from "./component/ContactList";

function App() {
  return (<div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
    <h1>Contact Book</h1>
    <Button variant="contained" onClick={ () => window.location.reload() }>Reset Book</Button>
    <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <ContactForm />
        </Grid>
        <Grid size={6}>
          <ContactList />
        </Grid>
      </Grid>
    </div>
  </div>);
}

export default App;
