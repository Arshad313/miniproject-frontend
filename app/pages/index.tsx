/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unknown-property */
import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { Button, Input } from "@mui/material"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div className="flex justify-evenly items-center w-screen">
          <img src="/logo-book.jpg" alt="" className="w-24" />
          <Button
            className=""
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </Button>
        </div>
        <div className="h-80 bg-slate-300 w-96 ml-52 mt-20 rounded-lg items-center justify-center">
          <h1 className="text-center p-5 font-mono text-lg">Search For Books</h1>
          <Input className="w-full p-3" placeholder="Enter A Title:" />
          <Input className="w-full p-3" placeholder="Enter An Author:" />
          <Button>Search</Button>
          <Button>Reset Fields</Button>
        </div>
      </>
    )
  } else {
    return (
      <div className="w-full flex p-5">
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small pl-5">
            <strong>Login</strong>
          </a>
        </Link>
      </div>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="flex justify-center h-screen w-screen">
      <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
