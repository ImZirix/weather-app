import "./styles.scss";
import { setupFormSubmission } from "./modules/weatherApi";
const input = document.querySelector("#search");
const form = document.querySelector("#form");

setupFormSubmission(form, input);
