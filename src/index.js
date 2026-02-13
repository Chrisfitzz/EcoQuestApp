import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProgressProvider>
        <MissionsProvider>
          <App />
        </MissionsProvider>
      </UserProgressProvider>
    </AuthProvider>
  </React.StrictMode>
);
