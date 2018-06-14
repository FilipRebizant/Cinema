<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Form\MovieType;
use App\Repository\MovieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\FileUploader;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\DBAL\Driver\Connection;
/**
 * @Route("/movie")
 */
class MovieController extends Controller {

    /**
     * @Route("/", name="movie_index", methods="GET")
     */
    public function index(MovieRepository $movieRepository): Response {
        return $this->render('movie/index.html.twig', ['movies' => $movieRepository->findAll()]);
        }

        /**
         * @Route("/new", name="movie_new", methods="GET|POST")
         */
        public function new(Request $request, FileUploader $fileUploader, Connection $connection): Response
        {
        $movie = new Movie();
        $form = $this->createForm(MovieType::class, $movie);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $file = $movie->getImage();
            $fileName = $fileUploader->upload($file);
            $movie->setImage($fileName);
            $mov = $request->get('movie');

            $stmt = $connection->prepare('begin '
                    . 'INSERT_MOVIE(:title, :age, :description, :categoryIn, :release_date, :grade, :timeIn, :image);'
                    . 'end;');
            $stmt->bindValue(':title', $mov['title']);
            $stmt->bindValue(':age', $mov['age']);
            $stmt->bindValue(':description', $mov['description']);
            $stmt->bindValue(':categoryIn', $mov['category']);
            $stmt->bindValue(':release_date', date('Y-m-d 00:00:00',strtotime(implode('/', $mov['release_date']))));
            $stmt->bindValue(':grade', $mov['grade']);
            $stmt->bindValue(':timeIn', date('1900-01-01 H:i:s',strtotime(implode(':', $mov['time']))));
            $stmt->bindValue(':image', $movie->getImage());
            $stmt->execute();
            return $this->redirectToRoute('movie_index');
        }

        return $this->render('movie/new.html.twig', [
                    'movie' => $movie,
                    'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="movie_show", methods="GET")
     */
    public function show(Movie $movie): Response {
        return $this->render('movie/show.html.twig', ['movie' => $movie]);
    }

    /**
     * @Route("/{id}/edit", name="movie_edit", methods="GET|POST")
     */
    public function edit(Request $request, Movie $movie, FileUploader $fileUploader, Connection $connection): Response {

        if ($movie->getImage()) {
            $movie->setImage(
                    new File($this->getParameter('images_directory') . '/' . $movie->getImage())
            );
        }
        $form = $this->createForm(MovieType::class, $movie);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $fileName = $fileUploader->upload($movie->getImage());
            $movie->setImage($fileName);
            
            $mov = $request->get('movie');
            
            $relaseDate = (array)$mov->getReleaseDate();
            $time =  (array)$mov->getTime();
           
            $stmt = $connection->prepare('begin '
                    . 'UPDATE_MOVIE(:id, :title, :age, :description, :categoryIn, :release_date, :grade, :timeIn, :image);'
                    . 'end;');
            $stmt->bindValue(':id', $mov->getId());
            $stmt->bindValue(':title', $mov->getTitle());
            $stmt->bindValue(':age', $mov->getAge());
            $stmt->bindValue(':description', $mov->getDescription());
            $stmt->bindValue(':categoryIn', $mov->getCategory());
            $stmt->bindValue(':release_date', date('Y-m-d 00:00:00',strtotime($relaseDate['date'])));
            $stmt->bindValue(':grade', $mov->getGrade());
            $stmt->bindValue(':timeIn',date('1900-01-01 H:i:s',strtotime($time['date'])));
            $stmt->bindValue(':image', $movie->getImage());
            $stmt->execute();
            
            return $this->redirectToRoute('movie_index');
        }

        return $this->render('movie/edit.html.twig', [
                    'movie' => $movie,
                    'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="movie_delete", methods="DELETE")
     */
    public function delete(Request $request, Movie $movie, Connection $connection): Response {
        if ($this->isCsrfTokenValid('delete' . $movie->getId(), $request->request->get('_token'))) {
            
            $mov = $request->get('movie');
            $stmt = $connection->prepare('begin '
                    . 'DELETE_MOVIE(:id); '
                    . 'end;');
            $stmt->bindValue(':id', $mov->getId());
            $stmt->execute();
        }

        return $this->redirectToRoute('movie_index');
    }

}
