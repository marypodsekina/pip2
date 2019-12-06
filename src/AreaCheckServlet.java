import bean.UserHistory;
import point.PointBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;

import static java.lang.Math.*;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        BigDecimal x = new BigDecimal(req.getParameter("X"));
        BigDecimal y = new BigDecimal(req.getParameter("Y"));
        BigDecimal r = new BigDecimal(req.getParameter("R"));

        int time;
        try {
            time = Integer.parseInt(req.getParameter("offset"));
        } catch (NumberFormatException e) {
            time = 0;
        }
//        if (((y>=0)&&(x<=0)&&(y<=r)&&(x>=-r))||(((pow(x,2)+pow(y,2))<=pow(r,2))&&(x>=0)&&(y<=0))||((x>=0)&&(y>=0)&&(y<=(r-x)))){
//            PrintWriter writer = resp.getWriter();
//            writer.write("Попадание");
//
//        }else{
//            PrintWriter writer = resp.getWriter();
//            writer.write("Промах");
//        }

        UserHistory history = (UserHistory) this.getServletContext().getAttribute("history");
        PointBean pointBean = new PointBean(x, y, r, time);
        history.addPoint(pointBean); //сформировали новую точку и поместили ее в историю
//        System.out.println(x+" "+y+" "+r);
//        System.out.println("hello");
        PrintWriter writer = resp.getWriter();
        resp.setContentType("text/json; charset=UTF-8");
        writer.println("{\"x\": " + pointBean.getX() + ", \"y\": " + pointBean.getY() + ", \"r\": " + pointBean.getR() + ", \"isInArea\": \"" + pointBean.isInArea() + "\", \"time\": \"" + pointBean.getDate() + "\"}");
//        } else if (req.getParameter("type") != null && req.getParameter("type").equals("ajax-no-cache")) {
//            resp.setContentType("text/json; charset=UTF-8");
//            out.println("{\"x\": " + point.getX() + ", \"y\": " + point.getY() + ", \"r\": " + point.getR() + ", \"inArea\": \"" + point.isInArea() + "\", \"time\": \"" + point.getTime() + "\"}");
//        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
