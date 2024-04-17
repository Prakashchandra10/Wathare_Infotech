function generateSummary(data) {
    if (!data || data.length === 0) {
        return {
            numOnes: 0,
            numZeros: 0,
            continuousOnes: 0,
            continuousZeros: 0
        };
    }

    let numOnes = 0;
    let numZeros = 0;
    let continuousOnes = 0;
    let continuousZeros = 0;
    let prevStatus = data[0].machine_status;

    for (let i = 0; i < data.length; i++) {
        const status = data[i].machine_status;
        if (status === 1) {
            numOnes++;
            if (prevStatus === 1) {
                continuousOnes++;
            } else {
                continuousOnes = 1;
            }
            prevStatus = 1;
        } else if (status === 0) {
            numZeros++;
            if (prevStatus === 0) {
                continuousZeros++;
            } else {
                continuousZeros = 1;
            }
            prevStatus = 0;
        }
    }

    return {
        numOnes,
        numZeros,
        continuousOnes,
        continuousZeros
    };
}

export default generateSummary;
