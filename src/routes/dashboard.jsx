// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import NewExercise from "../views/NewExercise/NewExercise.jsx";
import EditExercises from "../views/EditExercises/EditExercises.jsx";
import Workout from "../views/Workout/Workout.jsx";
import Typography from "../views/Typography/Typography.jsx";
import Icons from "../views/Icons/Icons.jsx";

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
    navbarName: "Profile",
    icon: LibraryBooks,
    component: NewExercise
  },
  {
    path: "/edit-exercises",
    sidebarName: "Edit Exercises",
    navbarName: "Table List",
    icon: LibraryBooks,
    component: EditExercises
  },
  {
    path: "/new-workout",
    sidebarName: "New Workout",
    navbarName: "Typography",
    icon: LibraryBooks,
    component: Workout
  },
  {
    path: "/edit-workout",
    sidebarName: "Edit Workout",
    navbarName: "Icons",
    icon: LibraryBooks,
    component: Icons
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
