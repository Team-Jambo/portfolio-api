import axios from "axios";



export const restartServer = async () => {
    try {
        const response = await axios.get(healthCheckUrl);
        console.log('Health Check Status:', response.data.status);
    } catch (error) {
        console.error('Health Check Failed:', error.message);
    }
};