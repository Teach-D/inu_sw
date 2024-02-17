package sw.contest.springboot.service;

import sw.contest.springboot.dto.reportBoard.Board;
import sw.contest.springboot.repository.reportBoard.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    // 글 작성
    public Board save(Board board) {
        boardRepository.save(board);
        return board;
    }

    public List<Board> findAll() {
        return boardRepository.findAll();
    }

    public Page<Board> pageFindAll(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }


    public Board findById(Long id) {
        Board findBoard = boardRepository.findById(id).get();
        return findBoard;
    }

    public Page<Board> pageFindById(Long id, Pageable pageable) {
        Page<Board> boards = boardRepository.findBoardById(id, pageable);
        return boards;
    }

    public List<Board> findByTitle(String title) {
        List<Board> byTitleContaining = boardRepository.findByTitleContaining(title);
        return byTitleContaining;
    }

    public Page<Board> pagedFindByTitle(String title, Pageable pageable) {
        Page<Board> byTitleContaining = boardRepository.findBoardByTitle(title, pageable);
        return byTitleContaining;
    }

    public void deleteById(Long id) {
        boardRepository.deleteById(id);
    }

    public void updateBoard(Long id, Board boardSearch) {
        Board board = boardRepository.findById(id).get();
        Board updatedBoard = new Board(board.getId(), boardSearch.getTitle(), boardSearch.getContent());
        boardRepository.save(updatedBoard);
    }

    // 게시글 리스트 처리
/*
    public Page<Board> boardList(Pageable pageable){

        return boardRepository.findAll(pageable);
    }

    public Page<Board> boardSearchList(String searchKeyword, Pageable pageable){

        return boardRepository.findByTitleContaining(searchKeyword, pageable);
    }

    // 특정 게시글 불러오기
    public Board boardView(Integer id){

        return boardRepository.findById(id).get();
    }

    // 특정 게시물 삭제

    public void boardDelete(Integer id){

        boardRepository.deleteById(id);
    }
*/


}