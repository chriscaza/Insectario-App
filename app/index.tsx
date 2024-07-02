import { createStackNavigator } from '@react-navigation/stack';

import Welcome from "@/components/screens/Welcome";
import LiveDetection from '@/components/camera/LiveDetection';

export default function index() {

  return (
    // <Welcome />
    <LiveDetection />
  );
}
