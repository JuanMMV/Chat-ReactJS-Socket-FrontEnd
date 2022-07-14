import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import ContactsComponent from '../components/ContactsComponent'
import WelcomeComponent from '../components/WelcomeComponent';
import ChatContainerComponent from '../components/ChatContainerComponent';
import { io } from 'socket.io-client';

const ChatScreen = () => {

  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    fetchData().catch(console.error);
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate('/setAvatar');
        }
      }
    }
    fetchData().catch(console.error);
  }, [currentUser, navigate]); //si por alguna razon falla quitar navigate

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <>
      <Container>
        <div className="container">
          <ContactsComponent
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange} />
          {isLoaded ? (
            currentChat === undefined ? (
              <WelcomeComponent currentUser={currentUser} />
            ) : (
              <ChatContainerComponent
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )
          ) : (console.log('cargando'))}
        </div>
      </Container>
    </>
  )
}

export default ChatScreen

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-columns: 35% 65%;
    }
  }
`;