
const loginService = async (username: string, password: string) => {
    const postData = {
        username: username,
        password: password
    };

    const rs = await fetch('http://localhost:4300/auth/uservalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(postData)
    })
        .then(response => response.json())
        .then(result => result)
        .catch(error => {
            return {
                messagecode: -999,
                message: "Something went wrong,contact with your admin"
            };
        });

    return rs;
}

export {
    loginService,
}