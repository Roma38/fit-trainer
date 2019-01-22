// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

// core components/views
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import NewExercise from "../views/NewExercise/NewExercise.jsx";
import EditExercises from "../views/EditExercises/EditExercises.jsx";
import NewWorkout from "../views/NewWorkout/NewWorkout.jsx";
import EditWorkout from "../views/EditWorkout/EditWorkout.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/new-exercise",
    sidebarName: "New Exercise",
    navbarName: "New Exercise",
    icon: LibraryBooks,
    component: NewExercise
  },
  {
    path: "/edit-exercises",
    sidebarName: "Edit Exercises",
    navbarName: "Edit Exercises",
    icon: LibraryBooks,
    component: EditExercises
  },
  {
    path: "/new-workout/:date",
    sidebarName: "New Workout",
    navbarName: "New Workout",
    icon: LibraryBooks,
    component: NewWorkout
  },
  {
    path: "/edit-workout/:date",
    sidebarName: "Edit Workout",
    navbarName: "Edit Workout",
    icon: LibraryBooks,
    component: EditWorkout
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
