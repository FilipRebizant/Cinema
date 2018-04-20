<?php

namespace App\Controller;

use App\Entity\Screening;
use App\Form\ScreeningType;
use App\Repository\ScreeningRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/screening")
 */
class ScreeningController extends Controller
{
    /**
     * @Route("/", name="screening_index", methods="GET")
     */
    public function index(ScreeningRepository $screeningRepository): Response
    {
        return $this->render('screening/index.html.twig', ['screenings' => $screeningRepository->findAll()]);
    }

    /**
     * @Route("/new", name="screening_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
       
        $screening = new Screening();
        $form = $this->createForm(ScreeningType::class, $screening);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($screening);
            $em->flush();

            return $this->redirectToRoute('screening_index');
        }
        
        return $this->render('screening/new.html.twig', [
            'screening' => $screening,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="screening_show", methods="GET")
     */
    public function show(Screening $screening): Response
    {
        return $this->render('screening/show.html.twig', ['screening' => $screening]);
    }

    /**
     * @Route("/{id}/edit", name="screening_edit", methods="GET|POST")
     */
    public function edit(Request $request, Screening $screening): Response
    {
        $form = $this->createForm(ScreeningType::class, $screening);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('screening_edit', ['id' => $screening->getId()]);
        }

        return $this->render('screening/edit.html.twig', [
            'screening' => $screening,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="screening_delete", methods="DELETE")
     */
    public function delete(Request $request, Screening $screening): Response
    {
        if ($this->isCsrfTokenValid('delete'.$screening->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($screening);
            $em->flush();
        }

        return $this->redirectToRoute('screening_index');
    }
}
