import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Gallery from "@/pages/Gallery";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/Layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
