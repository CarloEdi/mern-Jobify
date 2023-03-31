import React, { useEffect, useReducer } from "react";
import reducer from "./reducer" ;
import axios from "axios";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS
} from "./actions";

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  userLocation: "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  page: 1,
  numOfPages: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  limit: 10
};

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // request interceptor
  
  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };


  const registerUser = async (currentUser) => {
    console.log(currentUser);
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      console.log(response);
      const { user, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          location,
        },
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    console.log(currentUser, "User Logged In");
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/login", currentUser);
      const { user, location } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
          location,
        },
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  const logoutUser = async () => {
    await authFetch('/auth/logout')
    dispatch({ type: LOGOUT_USER });
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const updateUser = async (currentUser) => {
    try {
      dispatch({ type: UPDATE_USER_BEGIN });
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN })
    try {
      const { company, position, jobLocation, jobType, status } = state
      await authFetch.post('/jobs', {
      company,
      position,
      jobLocation,
      jobType,
      status,
      })
      dispatch({ type: CREATE_JOB_SUCCESS })
      clearValues()
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: CREATE_JOB_ERROR,
          payload: {
            msg: error.response.data.msg,
          },
        });
      }
    }
    clearAlert();
  };
  const getJobs = async () => {
    const { search, searchStatus, searchType, sort, page, limit } = state
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}&limit=${limit}`
    if(search) {
      url = url + `&search=${search}`
    }
    dispatch({ type: GET_JOBS_BEGIN })
    try {
      const { data } = await authFetch.get(url)
      const { jobs, totalJobs, numOfPages } = data
      dispatch({ 
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages} 
      })
    } catch (error) {
       logoutUser()
    }
  }
  const setEditJob = (
    _id,
    position,
    company,
    jobLocation,
    jobType,
    status) => {
    dispatch({ 
      type: SET_EDIT_JOB,
      payload: {
        _id,
        position,
        company,
        jobLocation,
        jobType,
        status
      } 
    })
  }
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN })
    try {
      const { company, position, jobLocation, jobType, status, editJobId } = state
      await authFetch.patch(`/jobs/${editJobId}`, {
      position, 
      company, 
      jobLocation, 
      jobType, 
      status
    })
      dispatch({ type: EDIT_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: {
          msg: error.response.data.msg
        }
      })
    }
    clearAlert()
  }
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN })
    try {
      await authFetch.delete(`/jobs/${jobId}`)
      getJobs()
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: {
          msg: error.response.data.msg
        }
      })
    }
    clearAlert()
  }
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch.get('/jobs/showStats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications
        }
      })
    } catch (error) {
       logoutUser()
    }
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  const changePage = (pageWanted) => {
    dispatch({ 
      type: CHANGE_PAGE,
      payload: {
        page: pageWanted === 'prev' ? state.page - 1 
        : pageWanted === 'next' ? state.page + 1 
        : pageWanted
      }
    })
  }
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN })
    try {
      const { data } = await authFetch('/auth/getCurrentUser')
      const { user, location } = data
      dispatch({ 
        type: GET_CURRENT_USER_SUCCESS,
        payload: {
          user,
          location
        } 
      })
    } catch (error) {
      if(error.response.status === 401) return
      logoutUser()
    }
  }
  useEffect(() => {
    getCurrentUser()
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        registerUser,
        loginUser,
        logoutUser,
        toggleSidebar,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        editJob,
        deleteJob,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, initialState, AppContextProvider }
