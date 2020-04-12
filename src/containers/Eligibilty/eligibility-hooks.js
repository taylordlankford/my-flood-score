import { useState, useEffect } from "react"
import { useFirebase } from "../../hooks";

export const useDomains = () => {
  const [pubDomain] = useState("https://flood-score.firebaseapp.com/search-eligibility");
  const [devDomain] = useState("http://localhost:3000/search-eligibility");
  return { pubDomain, devDomain }
}

export const useGetPropertyData = address => {
  const firebase = useFirebase();
  const [docData, setDocData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    firebase.doFirestoreAddressRefGet(address).then(properties => {
      const propertyDoc = properties[0];
      const { id } = propertyDoc;
      if (typeof id !== "undefined") {
        firebase.doFirestoreDocGet("properties", id).then(data => {
          setDocData(data)
          setLoading(false);
          setId(id)
        });
      }
    });

  }, [address, firebase])

  if (docData !== null || typeof docData !== 'undefined') {
    console.log(docData)
    return { id, docData, loading }
  }
}

export const useGetImg = address => {
  const firebase = useFirebase();
  const [imgUrlData, setImgUrlData] = useState(null)
  const [imgLoading, setImgLoading] = useState(true)

  useEffect(() => {
    firebase.doFirestoreAddressRefGet(address).then(properties => {
      const propertyDoc = properties[0];
      const { id } = propertyDoc;

      if (typeof id !== "undefined") {
        firebase.getDownloadURL(id).then(url => {
          if (url !== null || url !== undefined) {
            setImgUrlData(url)
            setImgLoading(false)
          }
        })
      }
    });
}, [imgUrlData, firebase])

  return { imgUrlData, imgLoading }
};