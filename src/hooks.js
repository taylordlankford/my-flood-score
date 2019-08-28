import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from 'react'

// Default history object (for unit tests)
const history = { location: { pathname: '/' } }

export const FirebaseContext = createContext(null)
export const StateContext = createContext()
export const ConfigContext = createContext({})
export const HistoryContext = createContext(history)
export const ResetContext = createContext(() => {})

export function useFirebase() {
  return useContext(FirebaseContext)
}

export function useStateValue() {
  return useContext(StateContext)
}

export function useConfig() {
  return useContext(ConfigContext)
}

export function useHistory() {
  return useContext(HistoryContext)
}

export function useReset() {
  return useContext(ResetContext)
}

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)


export const useFirebaseAuthentication = () => {
  const firebase = useFirebase()
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
     const unlisten = firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? setAuthUser(authUser)
            : setAuthUser(null)
        },
     )
     return () => {
         unlisten()
     }
  })

  return authUser
}

export const useFirestoreUser = () => {
  const authUser = useFirebaseAuthentication()
  const firebase = useFirebase()
  const uid = authUser ? authUser.uid : null
  // initialize our default state
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [firestoreUser, setFirestoreUser] = useState(null)
  // when the id attribute changes (including mount)
  // subscribe to the recipe document and update
  // our state when it changes.
  useEffect(() => {
      const unsubscribe = firebase.db.collection("users").where("uid", "==", uid)
        .onSnapshot( querySnapshot => {
          var user = null
          querySnapshot.forEach(function(doc) {
            const data = doc.data()
            user = data
          })
          setFirestoreUser(user)
          setLoading(false)
        }, err => {
          setError(err)
        })
      // returning the unsubscribe function will ensure that
      // we unsubscribe from document changes when our id
      // changes to a different value.
      return () => unsubscribe()
    },
    [uid, firebase.db]
  )

  return {
    error,
    loading,
    firestoreUser,
  }
}

const DESKTOP_BREAKPOINT = 1024
export const useIsMobile = () => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [width])
  return width < DESKTOP_BREAKPOINT
}
