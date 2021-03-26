import React from 'react'
import Header from '../components/header/Header'
import Main from '../components/main/Main'
import RegisterForm from '../components/register/RegisterForm'

function RegisterPage() {
    return (
        <>
        <Header />
        <Main>
            <RegisterForm />
        </Main>
        </>
    )
}

export default RegisterPage
