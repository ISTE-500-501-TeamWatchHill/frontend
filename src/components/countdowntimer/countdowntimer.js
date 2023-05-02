import React from "react";
import styles from './countdowntimer.module.css';

export default function CountdownTimer() {

    const countDownDate = new Date("June 1, 2023 15:37:25").getTime();
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    // Update count down every 1 second
    let x = setInterval(function() {

        // Get today's date and time
        const now = new Date().getTime();
  
        // Find the distance between now and the count down date
        const distance = countDownDate - now;
  
        // Time calculations for days, hours, minutes and seconds
        days = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        // Display the timer
        document.getElementById("days").innerHTML = days + "d";
        document.getElementById("hours").innerHTML = hours + "h";
        document.getElementById("minutes").innerHTML = minutes + "m";
        document.getElementById("seconds").innerHTML = seconds + "s";
    
        // If the count down is finished, write some text
        if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);

    return (
        <>
            <div className={styles.grid}>
                <p id="days" className={styles.timer}></p>
                <p id="hours" className={styles.timer}></p>
                <p id="minutes" className={styles.timer}></p>
                <p id="seconds" className={styles.timer}></p>
            </div>
        </>
    )
}