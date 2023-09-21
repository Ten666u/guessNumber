import '../assets/styles/bootstrap-reboot.min.css'
import '../assets/styles/style.css'

import { readyButton } from "./gameLogic.js"

const startButton = document.getElementById("startButton")

startButton.addEventListener("click", readyButton)