import React  from 'react'
import { Avatar, Image } from 'antd';
import { connect } from 'react-redux';
import { actionAuthLogout } from '../redux/actions/actions';
import { Link } from 'react-router-dom';




const Profile = ({user , onLogout}) => {

    const { avatar, login, nick} = user

  return (
    <div className='profile'>
      
      {avatar ?  <Avatar
            src={
                <Image
                src={`http://marketplace.node.ed.asmer.org.ua/${avatar.url}`}
                style={{
                    width: 40
                  
                }}
                />
            }
            />
           : 'avatar not found' }
        <p className='profile__name'>Name: {login}</p>
        
        <p className='profile__username'>Username: {!!nick ? nick : null}</p>
        <Link to={"/profile/edit"}> 
             <button className='profile__btn' >Edit profile</button>
        </Link>
        <button className='profile__btn' onClick={() => onLogout()}>Log out</button>
    </div>
  )
}

const CProfile = connect(state => ({user: state.promise?.aboutMe?.payload}),{onLogout: actionAuthLogout})(Profile)

export default CProfile
