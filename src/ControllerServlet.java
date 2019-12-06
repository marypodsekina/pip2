import bean.UserHistory;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (this.getServletContext().getAttribute("history") == null) {
            this.getServletContext().setAttribute("history", new UserHistory());
        }
        if (req.getParameter("type") != null && req.getParameter("type").equals("clear")) {
            UserHistory history = (UserHistory) this.getServletContext().getAttribute("history");
            history.clearHistory();
        } else if (req.getParameter("X") == null || req.getParameter("Y") == null || req.getParameter("R") == null) {
            RequestDispatcher requestDispatcher = req.getRequestDispatcher("pages/index.jsp");
            requestDispatcher.forward(req, resp);
        } else {
            RequestDispatcher requestDispatcher = req.getRequestDispatcher("/check");
            requestDispatcher.forward(req, resp);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (this.getServletContext().getAttribute("history") == null) {
            this.getServletContext().setAttribute("history", new UserHistory());
        }
        RequestDispatcher requestDispatcher = req.getRequestDispatcher("pages/index.jsp");
        requestDispatcher.forward(req, resp);
    }
}
