
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default  function GetNombreCmnt  (props)  {
    const { post_id, token } = props;
    const [nbr_cmnt, setNbr_cmnt] = useState(0);
    useEffect(() => {
        const fetch_nbr_cmnt = async (post_id) => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/social/nbrcomment/' +post_id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNbr_cmnt(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetch_nbr_cmnt(post_id);
    }, [post_id, token]);
    return (
        <div>
            {nbr_cmnt} comments
        </div>
    )
}