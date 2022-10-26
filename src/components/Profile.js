import React  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actionAuthLogout } from '../redux/actions/actions';
import { Link } from 'react-router-dom';




const Profile = () => {
    const user = useSelector(state => state.promise?.aboutMe?.payload)
    const dispatch = useDispatch()
    const { avatar, login, nick} = user

  return (
    <div className='profile'>
      
      {avatar ?  <img
            
                src={`http://marketplace.node.ed.asmer.org.ua/${avatar.url}`}
                style={{
                    maxWidth: 150,
                    maxHeight: 150,
                    width: '100%',
                    height: '100%'
                  
                }}
                alt='img'
                />
            
            
           : 'avatar not found' }
        <p className='profile__name'>Name: {login}</p>
        
        <p className='profile__username'>Username: {!!nick ? nick : null}</p>
        <Link to={"/profile/edit"}> 
             <button className='profile__btn secondary' >Edit profile</button>
        </Link>
        <button className='profile__btn' onClick={() => dispatch(actionAuthLogout())}>Log out</button>
    </div>
  )
}


export default Profile
