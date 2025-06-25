
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyInfo from './CompanyInfo';
import CreateCompany from './CreateCompany';
import { selectUser } from '../../features/auth/authSlice';
import { getMyCompany } from '../../features/company/companyThunks';
import { setCurrentCompany } from '../../features/company/companySlice';



const Company = () => {
    const [companyId, setCompanyId] = useState(null);
    const authUser = useSelector(selectUser);
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getMyCompany(authUser.id)).unwrap()
        .then(res => {
           dispatch(setCurrentCompany(res));
            setCompanyId(res.id);
        })
        .catch(err => {
            console.error(err);
        });

    }, [dispatch]);
    


  return (
   companyId ? <CompanyInfo /> : <CreateCompany />
  );
};

export default Company;

