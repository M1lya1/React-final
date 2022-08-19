import React  from 'react'
import { Avatar, Image } from 'antd';
import { connect } from 'react-redux';
import { actionAuthLogout } from '../redux/actions/actions';
import { Link } from 'react-router-dom';




const Profile = ({user , onLogout}) => {

    const {avatar, login, nick} = user

  return (
    <div>
      
      {avatar ?  <Avatar
            src={
                <Image
                src={`http://marketplace.node.ed.asmer.org.ua/${avatar.url}`}
                style={{
                    width: 60,
                }}
                />
            }
            />
           : [] }
        <p>Name: {login}</p>
        
        <p>Username: {!!nick ? nick : null}</p>
        <Link to={"/profile/edit"}> <button></button></Link>
        <button onClick={() => onLogout()}>Log out</button>
    </div>
  )
}

const CProfile = connect(state => ({user: state?.aboutMe?.payload}),{onLogout: actionAuthLogout})(Profile)

export default CProfile