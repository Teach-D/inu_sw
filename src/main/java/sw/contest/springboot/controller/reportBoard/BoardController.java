package sw.contest.springboot.controller.reportBoard;

import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
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

import java.util.List;

@Controller
@Slf4j
public class BoardController {

    @Autowired
    private BoardService boardService;
    @GetMapping("/board/write") // localhost:8080/board/wirte
    public String boardWriteForm(Model model){
        model.addAttribute("board", new Board());
        return "/reportBoard/boardwrite";
    }

    @PostMapping("/board/view")
    public String boardView(@Validated @ModelAttribute Board board, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {

            return "/reportBoard/boardwrite";
        }
        boardService.save(board);
        return "/reportBoard/boardview";
    }

    @PostMapping("/board/list")
    public String boardList(Model model, @RequestParam String select, @RequestParam(required = false) String searchKeyword
    , @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

        log.info(select + "," + searchKeyword);

        Page<Board> findBoardList = null;

        if(select == null || searchKeyword == "") {
            findBoardList = boardService.pageFindAll(pageable);
            model.addAttribute("list", findBoardList);
        } else if(select.equals("id")) {
            findBoardList = boardService.pageFindById(Long.valueOf(searchKeyword), pageable);
            log.info("id로 찾기");

            model.addAttribute("list", findBoardList);
        } else {
            findBoardList = boardService.pagedFindByTitle(searchKeyword, pageable);
            model.addAttribute("list", findBoardList);
        }

        int nowPage = findBoardList.getPageable().getPageNumber()+1;
        int startPage = Math.max(nowPage-4, 1);
        int endPage = Math.min(nowPage+1, findBoardList.getTotalPages());
        //int nowPage = board
        /*for (Board board : boardAll) {
            log.info(String.valueOf(board.getId()));
        }*/
        model.addAttribute("list", findBoardList);
        model.addAttribute("nowPage", nowPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);


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
        log.info(String.valueOf(findBoard));
        return "reportBoard/boardmodify";
    }

    @PostMapping("/board/update/{id}")
    public String modifiedBoard(@PathVariable Long id, @Validated
    Board boardSearch, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            return "/reportBoard/boardmodify";
        }

        boardService.updateBoard(id, boardSearch);
        return "redirect:/board/list";
    }

    @GetMapping("/board/list")
    public String boardWritePro(Model model, @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        Page<Board> boardAll = boardService.pageFindAll(pageable);
        int nowPage = boardAll.getPageable().getPageNumber()+1;
        int startPage = Math.max(nowPage-4, 1);
        int endPage = Math.min(nowPage+1, boardAll.getTotalPages());
        //int nowPage = board
        /*for (Board board : boardAll) {
            log.info(String.valueOf(board.getId()));
        }*/
        model.addAttribute("list", boardAll);
        model.addAttribute("nowPage", nowPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        return "/reportBoard/boardlist";
    }

    @GetMapping("/board/view")
    public String boardContent(@RequestParam Long id, Model model) {
        Board findBoard = boardService.findById(id);
        model.addAttribute("board", findBoard);
        return "/reportBoard/boardview";
    }

}
