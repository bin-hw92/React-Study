

const User = ({user}) => {
    const {email, name, username} = user;
    console.log(user, "user");
    return (
        <div>
            <ul>
                <h1>
                    {username} ({name})
                </h1>
                <p>
                    <b>e-mnail : </b> {email}
                </p>
            </ul>
        </div>
    );
};

export default User;