import React from "react";
import { AuthProvider } from "../contexts/AuthFirebaseContext";
import { DemoAuthProvider } from "../contexts/AuthDemoContext";
import { UserDataProvider } from "../contexts/UserDataContext";
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom"
import AuthLoader from "./AuthLoader";
import PrivateRoute from "./PrivateRoute";
import DrawerWrap from "./DrawerWrap";
import Login from '../pages/components/Login';
import DemoLogin from '../pages/components/DemoLogin';
import Dashboard from '../pages/dashboard/Dashboard'
import Project from '../pages/project/Project2';
import Ticket from '../pages/ticket/TIcket';
import Analytics from '../pages/analytics/Analytics2'
import NewTicket from '../pages/ticket/NewTicket'
import UpdateTicket from '../pages/ticket/UpdateTicket'
import NewProject from '../pages/project/NewProject'
import UpdateProject from '../pages/project/UpdateProject'
import Mail from '../pages/mail/Mail'
import Message from '../pages/mail/Message'
import User from '../pages/user/User';
import User2 from '../pages/user/User2';
import AltUser from '../pages/user/AltUser';
import Users from '../pages/user/Users';
import Users2 from '../pages/user/Users2';
import LoadDemoData from "../services/LoadDemoData";
import './App.css';

import DrawerWrap2 from "./DrawerWrap2";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <DemoAuthProvider>
            <UserDataProvider>
              <Switch>

                <Route exact path="/" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap2>
                          <PrivateRoute>  
                            <Dashboard />                      
                          </PrivateRoute>
                        </DrawerWrap2>
                      </LoadDemoData>
                    </AuthLoader>
                  } 
                />

                <Route exact path="/analytics" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap2>
                          <PrivateRoute>  
                            <Analytics />                      
                          </PrivateRoute>
                        </DrawerWrap2>
                      </LoadDemoData>
                    </AuthLoader>
                  } 
                />

                <Route exact path="/project/new" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap>
                          <PrivateRoute>  
                            <NewProject />                      
                          </PrivateRoute>
                        </DrawerWrap>
                      </LoadDemoData>
                    </AuthLoader>
                  } 
                />

                <Route exact path="/project/:id" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap2>
                          <PrivateRoute>  
                            <Project />                      
                          </PrivateRoute>
                        </DrawerWrap2>
                      </LoadDemoData>
                    </AuthLoader>
                  } 
                />

                <Route exact path="/project/update/:id" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap>
                          <PrivateRoute>  
                            <UpdateProject />                      
                          </PrivateRoute>
                        </DrawerWrap>
                      </LoadDemoData>
                    </AuthLoader>
                  } 
                />

                <Route exact path="/ticket/new" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap>
                          <PrivateRoute>  
                            <NewTicket />                      
                          </PrivateRoute>
                        </DrawerWrap>
                      </LoadDemoData>
                    </AuthLoader>
                  }
                />

                <Route exact path="/ticket/:id" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap>
                          <PrivateRoute>  
                            <Ticket />                      
                          </PrivateRoute>
                        </DrawerWrap>
                      </LoadDemoData>
                    </AuthLoader>
                  } 
                />

                <Route exact path="/ticket/update/:id" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap>
                          <PrivateRoute>  
                            <UpdateTicket />                      
                          </PrivateRoute>
                        </DrawerWrap>
                      </LoadDemoData>
                    </AuthLoader>
                  } 
                />

                <Route exact path="/mail" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap2>
                          <PrivateRoute>  
                            <Mail />                      
                          </PrivateRoute>
                        </DrawerWrap2>
                      </LoadDemoData>
                    </AuthLoader>
                  } 
                />

                <Route exact path="/mail/message/:id" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap>
                          <PrivateRoute>  
                            <Message />                      
                          </PrivateRoute>
                        </DrawerWrap>
                      </LoadDemoData>
                    </AuthLoader>
                  } 
                />

                <Route exact path="/user" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap2>
                          <PrivateRoute>  
                            <User2 />                      
                          </PrivateRoute>
                        </DrawerWrap2>
                      </LoadDemoData>
                    </AuthLoader>
                  } 
                />

                <Route exact path="/user/:id" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap>
                          <PrivateRoute>  
                            <AltUser />                      
                          </PrivateRoute>
                        </DrawerWrap>
                      </LoadDemoData>
                    </AuthLoader>
                  } 
                />

                <Route exact path="/users" element={ 
                    <AuthLoader>
                      <LoadDemoData>
                        <DrawerWrap2>
                          <PrivateRoute>  
                            <Users2 />                      
                          </PrivateRoute>
                        </DrawerWrap2>
                      </LoadDemoData>
                    </AuthLoader>
                  } 
                />

                <Route exact path="/login" element={ <Login /> } />
                <Route exact path="/demo" element={ <DemoLogin /> } />

              </Switch>
            </UserDataProvider>  
          </DemoAuthProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
