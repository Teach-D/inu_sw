package sw.contest.springboot.controller.reportBoard;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;
import sw.contest.springboot.dto.reportBoard.Board;
import sw.contest.springboot.repository.reportBoard.BoardRepository;
import sw.contest.springboot.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
@Slf4j
public class BoardController {

    @Autowired
    private BoardService boardService;
    @GetMapping("/board/write") // localhost:8080/board/wirte
    public String boardWriteForm(){

        return "/reportBoard/boardwrite";
    }

    @PostMapping("/board/view")
    public String boardView(Board board, Model model) {
        boardService.save(board);
        model.addAttribute("board", board);
        return "/reportBoard/boardview";
    }

    @PostMapping("/board/list")
    public String boardList(Model model, @RequestParam String select, @RequestParam(required = false) String searchKeyword) {

        log.info(select + "," + searchKeyword);
        if(select == null || searchKeyword == "") {
            List<Board> boardAll = boardService.findAll();
            model.addAttribute("list", boardAll);
        } else if(select.equals("id")) {
            Board board = boardService.findById(Long.valueOf(searchKeyword));
            log.info("id로 찾기");
            log.info(board.getTitle());
            model.addAttribute("list", board);
        } else {
            List<Board> boardServiceByTitle = boardService.findByTitle(searchKeyword);
            model.addAttribute("list", boardServiceByTitle);

        }

        return "reportBoard/boardlist";
    }

    @GetMapping("/board/delete")
    public String deleteBoard(@RequestParam String id) {
        boardService.deleteById(Long.valueOf(id));
        return "redirect:/board/list";
    }

    @GetMapping("/board/modify/{id}")
    public String modifyBoardContent(@PathVariable Long id, Model model) {
        Board findBoard = boardService.findById(id);
        log.info("id : ", id);
        model.addAttribute("board", findBoard);
        return "reportBoard/boardmodify";
    }

    @PostMapping("/board/update/{id}")
    public String modifiedBoard(@PathVariable Long id, Board boardSearch) {
        boardService.updateBoard(id, boardSearch);
        return "redirect:/board/list";
    }

    @GetMapping("/board/list")
    public String boardWritePro(Model model){
        List<Board> boardAll = boardService.findAll();
        for (Board board : boardAll) {
            log.info(String.valueOf(board.getId()));
        }
        model.addAttribute("list", boardAll);
        return "/reportBoard/boardlist";
    }

    @GetMapping("/board/view")
    public String boardContent(@RequestParam Long id, Model model) {
        Board findBoard = boardService.findById(id);
        model.addAttribute("board", findBoard);
        return "/reportBoard/boardview";
    }
/*    @PostMapping("")
    public String boardList(Model model) {

        for (Board board : boardAll) {
            log.info(board.getTitle());
        }
        return "/reportBoard/boardlist";
    }*/

/*    @GetMapping("/board/list")
    public String boardList(Model model,
                            @PageableDefault(page = 0, size = 10, sort = "id",direction = Sort.Direction.DESC) Pageable pageable,
                            String searchKeyword){

        Page<Board> list = null;

        if(searchKeyword == null){
            list = boardService.boardList(pageable);
        }else{
            list = boardService.boardSearchList(searchKeyword, pageable);
        }


        int nowPage = list.getPageable().getPageNumber() + 1;
        int startPage = Math.max(nowPage - 4, 1);
        int endPage = Math.min(nowPage + 5, list.getTotalPages());

        model.addAttribute("list", list);
        model.addAttribute("nowPage",nowPage);
        model.addAttribute("startPage",startPage);
        model.addAttribute("endPage",endPage);

        return "/reportBoard/boardlist";
    }

    @GetMapping("/board/view") // localhost:8080/board/view?id=1
    public String boardView(Model model,Integer id){

        model.addAttribute("board",boardService.boardView(id));
        return "/reportBoard/boardview";
    }

    @GetMapping("/board/delete")
    public String boardDelete(Integer id, Model model){

        boardService.boardDelete(id);

        model.addAttribute("message", "삭제가 완료되었습니다.");
        model.addAttribute("searchUrl", "/board/list ");

        return "/reportBoard/message";
    }

    @GetMapping("/board/modify/{id}")
    public String boardModify(@PathVariable("id") Integer id, Model model){

        model.addAttribute("board",boardService.boardView(id));

        return "/reportBoard/boardmodify";
    }

    @PostMapping("/board/update/{id}")
    public String boardUpdate(@PathVariable("id") Integer id, Board board, Model model){

        Board boardTemp =  boardService.boardView(id);
        boardTemp.setTitle(board.getTitle());
        boardTemp.setContent(board.getContent());

        boardService.write(boardTemp);

        model.addAttribute("message", "수정이 완료되었습니다.");
        model.addAttribute("searchUrl", "/board/list ");

        return "/reportBoard/message";
    }*/
}
