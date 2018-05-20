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

/**
 * @Route("/movie")
 */
class MovieController extends Controller
{
    /**
     * @Route("/", name="movie_index", methods="GET")
     */
    public function index(MovieRepository $movieRepository): Response
    {
        return $this->render('movie/index.html.twig', ['movies' => $movieRepository->findAll()]);
    }

    /**
     * @Route("/new", name="movie_new", methods="GET|POST")
     */
    public function new(Request $request, FileUploader $fileUploader): Response
    {
        $movie = new Movie();
        $form = $this->createForm(MovieType::class, $movie);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            
            $file = $movie->getImage();
            $fileName = $fileUploader->upload($file);

            $movie->setImage($fileName);
            
            $em = $this->getDoctrine()->getManager();
            $em->persist($movie);
            $em->flush();

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
    public function show(Movie $movie): Response
    {
        return $this->render('movie/show.html.twig', ['movie' => $movie]);
    }

    /**
     * @Route("/{id}/edit", name="movie_edit", methods="GET|POST")
     */
    public function edit(Request $request, Movie $movie, FileUploader $fileUploader): Response
    {
      
        $movie->setImage(
            new File($this->getParameter('images_directory').'/'.$movie->getImage())
        );
        $form = $this->createForm(MovieType::class, $movie);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            
            $file = $movie->getImage();
            $fileName = $fileUploader->upload($file);
            $movie->setImage($fileName);
            
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('movie_edit', ['id' => $movie->getId()]);
        }
        
        
        return $this->render('movie/edit.html.twig', [
            'movie' => $movie,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="movie_delete", methods="DELETE")
     */
    public function delete(Request $request, Movie $movie): Response
    {
        if ($this->isCsrfTokenValid('delete'.$movie->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($movie);
            $em->flush();
        }

        return $this->redirectToRoute('movie_index');
    }
    
}
